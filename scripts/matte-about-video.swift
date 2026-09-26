import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

// Use Apple's on-device person segmentation so the moving cut-out remains
// photographic footage of Patrick, not a generated likeness.
let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
let files: [URL]
if input.hasDirectoryPath {
  files = try FileManager.default.contentsOfDirectory(at: input, includingPropertiesForKeys: nil)
    .filter { $0.pathExtension.lowercased() == "png" }
    .sorted { $0.lastPathComponent < $1.lastPathComponent }
  try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)
} else {
  files = [input]
}

let context = CIContext(options: [.useSoftwareRenderer: false])
for file in files {
  guard let source = CGImageSourceCreateWithURL(file as CFURL, nil),
        let cgImage = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
    throw NSError(domain: "AboutMatte", code: 1, userInfo: [NSLocalizedDescriptionKey: "Cannot read \(file.path)"])
  }
  let request = VNGeneratePersonInstanceMaskRequest()
  let handler = VNImageRequestHandler(cgImage: cgImage)
  try handler.perform([request])
  guard let result = request.results?.first else {
    throw NSError(domain: "AboutMatte", code: 2, userInfo: [NSLocalizedDescriptionKey: "No person mask for \(file.path)"])
  }

  let labels = result.instanceMask
  CVPixelBufferLockBaseAddress(labels, .readOnly)
  defer { CVPixelBufferUnlockBaseAddress(labels, .readOnly) }
  let width = CVPixelBufferGetWidth(labels)
  let height = CVPixelBufferGetHeight(labels)
  let stride = CVPixelBufferGetBytesPerRow(labels)
  let bytes = CVPixelBufferGetBaseAddress(labels)!.assumingMemoryBound(to: UInt8.self)
  var counts: [UInt8: Int] = [:]
  for y in 0..<height {
    for x in 0..<Int(Double(width) * 0.55) {
      let label = bytes[y * stride + x]
      if label != 0 { counts[label, default: 0] += 1 }
    }
  }
  guard let patrick = counts.max(by: { $0.value < $1.value })?.key else {
    throw NSError(domain: "AboutMatte", code: 6, userInfo: [NSLocalizedDescriptionKey: "Cannot identify Patrick in \(file.path)"])
  }
  let selected = IndexSet(integer: Int(patrick))
  let maskBuffer = try result.generateScaledMaskForImage(forInstances: selected, from: handler)

  let image = CIImage(cgImage: cgImage)
  let mask = CIImage(cvPixelBuffer: maskBuffer)
  let transparent = CIImage(color: .clear).cropped(to: image.extent)
  guard let blend = CIFilter(name: "CIBlendWithMask", parameters: [
    kCIInputImageKey: image,
    kCIInputBackgroundImageKey: transparent,
    kCIInputMaskImageKey: mask,
  ])?.outputImage,
  let rendered = context.createCGImage(blend, from: image.extent) else {
    throw NSError(domain: "AboutMatte", code: 3, userInfo: [NSLocalizedDescriptionKey: "Cannot render \(file.path)"])
  }
  let destinationURL = input.hasDirectoryPath ? output.appendingPathComponent(file.lastPathComponent) : output
  guard let destination = CGImageDestinationCreateWithURL(destinationURL as CFURL, UTType.png.identifier as CFString, 1, nil) else {
    throw NSError(domain: "AboutMatte", code: 4, userInfo: [NSLocalizedDescriptionKey: "Cannot write \(destinationURL.path)"])
  }
  CGImageDestinationAddImage(destination, rendered, nil)
  guard CGImageDestinationFinalize(destination) else {
    throw NSError(domain: "AboutMatte", code: 5, userInfo: [NSLocalizedDescriptionKey: "Cannot finish \(destinationURL.path)"])
  }
  print(destinationURL.path)
}
