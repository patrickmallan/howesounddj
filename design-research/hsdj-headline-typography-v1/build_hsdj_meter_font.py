from pathlib import Path

from fontTools.fontBuilder import FontBuilder
from fontTools.colorLib.builder import buildCOLR, buildCPAL
from fontTools.pens.ttGlyphPen import TTGlyphPen


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "public" / "fonts" / "hsdj-meter-matrix-v6.woff2"

PATTERNS = {
    "A": ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    "B": ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    "C": ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
    "D": ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    "E": ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    "F": ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
    "G": ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
    "H": ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    "I": ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    "J": ["00111", "00010", "00010", "00010", "10010", "10010", "01100"],
    "K": ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    "L": ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    "M": ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
    "N": ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
    "O": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    "P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    "Q": ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
    "R": ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    "S": ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    "T": ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    "U": ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    "V": ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
    "W": ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
    "X": ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
    "Y": ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    "Z": ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
    "0": ["01110", "10011", "10101", "10101", "11001", "10001", "01110"],
    "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
    "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
    "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
    "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
    "5": ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
    "6": ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
    "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
    "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
    "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
    "!": ["1", "1", "1", "1", "1", "0", "1"],
    "?": ["01110", "10001", "00001", "00010", "00100", "00000", "00100"],
    ".": ["0", "0", "0", "0", "0", "0", "1"],
    ",": ["00", "00", "00", "00", "00", "10", "01"],
    ":": ["0", "1", "1", "0", "1", "1", "0"],
    ";": ["00", "10", "10", "00", "10", "10", "01"],
    "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
    "/": ["00001", "00010", "00010", "00100", "01000", "01000", "10000"],
    "&": ["01100", "10010", "10100", "01000", "10101", "10010", "01101"],
    "'": ["01", "01", "10", "00", "00", "00", "00"],
    "\"": ["101", "101", "010", "000", "000", "000", "000"],
    "(": ["001", "010", "100", "100", "100", "010", "001"],
    ")": ["100", "010", "001", "001", "001", "010", "100"],
    "+": ["00000", "00100", "00100", "11111", "00100", "00100", "00000"],
}

CELL_W = 108
CELL_H = 108
GAP_X = 21
GAP_Y = 21
LEFT = 28
BASELINE = 24
ADVANCE = LEFT * 2 + CELL_W * 5 + GAP_X * 4
SPACE_ADVANCE = 330


def pattern_advance(pattern):
    columns = len(pattern[0])
    return LEFT * 2 + CELL_W * columns + GAP_X * max(0, columns - 1)


def add_polygon(pen, points):
    pen.moveTo(points[0])
    for point in points[1:]:
        pen.lineTo(point)
    pen.closePath()


def segment(pen, x, y):
    bevel = 5
    add_polygon(
        pen,
        [
            (x + bevel, y),
            (x + CELL_W - bevel, y),
            (x + CELL_W, y + bevel),
            (x + CELL_W, y + CELL_H - bevel),
            (x + CELL_W - bevel, y + CELL_H),
            (x + bevel, y + CELL_H),
            (x, y + CELL_H - bevel),
            (x, y + bevel),
        ],
    )


def glyph_from_pattern(pattern, draw_lit=True):
    pen = TTGlyphPen(None)
    for row, values in enumerate(pattern):
        for column, value in enumerate(values):
            if draw_lit and value != "1":
                continue
            x = LEFT + column * (CELL_W + GAP_X)
            y = BASELINE + (6 - row) * (CELL_H + GAP_Y)
            segment(pen, x, y)
    return pen.glyph()


def empty_glyph():
    return TTGlyphPen(None).glyph()


def glyph_name(char):
    names = {
        " ": "space", "!": "exclam", "\"": "quotedbl", "'": "quotesingle",
        "(": "parenleft", ")": "parenright", "+": "plus", ",": "comma",
        "-": "hyphen", ".": "period", "/": "slash", ":": "colon",
        ";": "semicolon", "?": "question", "&": "ampersand",
    }
    return names.get(char, char)


def build():
    chars = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") + list("!?'\".,:;-/&()+")
    base_names = [glyph_name(char) for char in chars]
    layer_names = [layer for name in base_names for layer in (f"{name}.grid", f"{name}.lit")]
    order = [".notdef", "space"] + base_names + layer_names
    glyphs = {".notdef": empty_glyph(), "space": empty_glyph()}
    metrics = {".notdef": (ADVANCE, 0), "space": (SPACE_ADVANCE, 0)}
    cmap = {32: "space"}
    color_glyphs = {}

    for char in chars:
        name = glyph_name(char)
        glyphs[name] = glyph_from_pattern(PATTERNS[char])
        advance = pattern_advance(PATTERNS[char])
        metrics[name] = (advance, LEFT)
        grid_name = f"{name}.grid"
        lit_name = f"{name}.lit"
        glyphs[grid_name] = glyph_from_pattern(["1" * len(PATTERNS[char][0])] * 7, draw_lit=False)
        glyphs[lit_name] = glyph_from_pattern(PATTERNS[char])
        metrics[grid_name] = (advance, LEFT)
        metrics[lit_name] = (advance, LEFT)
        color_glyphs[name] = [(grid_name, 0), (lit_name, 1)]
        cmap[ord(char)] = name
        if char.isalpha():
            cmap[ord(char.lower())] = name

    cmap.update({
        0x2018: "quotesingle",
        0x2019: "quotesingle",
        0x201C: "quotedbl",
        0x201D: "quotedbl",
        0x2013: "hyphen",
        0x2014: "hyphen",
    })

    fb = FontBuilder(1000, isTTF=True)
    fb.setupGlyphOrder(order)
    fb.setupCharacterMap(cmap)
    fb.setupGlyf(glyphs)
    fb.setupHorizontalMetrics(metrics)
    fb.setupHorizontalHeader(ascent=960, descent=-70)
    fb.setupNameTable({
        "familyName": "HSDJ Meter Matrix V6",
        "styleName": "Regular",
        "uniqueFontIdentifier": "Howe Sound DJ:HSDJ Meter Matrix V6:2026",
        "fullName": "HSDJ Meter Matrix V6 Regular",
        "psName": "HSDJMeterMatrixV6-Regular",
        "version": "Version 6.000",
    })
    fb.setupOS2(
        sTypoAscender=960,
        sTypoDescender=-70,
        usWinAscent=960,
        usWinDescent=70,
        sxHeight=700,
        sCapHeight=912,
        usWeightClass=800,
        usWidthClass=5,
    )
    fb.setupPost()
    fb.setupMaxp()
    fb.font["COLR"] = buildCOLR(color_glyphs, version=0, glyphMap=fb.font.getReverseGlyphMap())
    fb.font["CPAL"] = buildCPAL(
        [
            # Every palette begins with the same unlit matrix. Only the signal changes.
            [(0.090, 0.125, 0.106, 1), (1.0, 0.255, 0.706, 1)],  # pink
            [(0.090, 0.125, 0.106, 1), (1.0, 0.859, 0.020, 1)],  # yellow
            [(0.090, 0.125, 0.106, 1), (0.322, 0.929, 0.494, 1)],  # green
            [(0.090, 0.125, 0.106, 1), (0.153, 0.847, 0.933, 1)],  # cyan
            [(0.090, 0.125, 0.106, 1), (0.596, 0.329, 1.0, 1)],  # violet
            [(0.090, 0.125, 0.106, 1), (1.0, 0.192, 0.329, 1)],  # red
            [(0.090, 0.125, 0.106, 1), (0.949, 0.929, 0.890, 1)],  # paper
            # Light surfaces invert the display: quiet matrix, near-black signal.
            [(0.835, 0.816, 0.765, 1), (0.043, 0.059, 0.067, 1)],
            # H1 chase layers keep the grid transparent so only lit cells change.
            [(0.0, 0.0, 0.0, 0.0), (0.075, 0.882, 1.0, 1)],  # cyan chase
            [(0.0, 0.0, 0.0, 0.0), (1.0, 0.255, 0.706, 1)],  # pink chase
        ]
    )
    fb.font.flavor = "woff2"
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    fb.font.save(OUTPUT)
    print(OUTPUT)


if __name__ == "__main__":
    build()
