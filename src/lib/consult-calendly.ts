import { PUBLIC_SOUND_CHECK_SCHEDULING } from "@/config/site-scheduling";

export {
  PUBLIC_SOUND_CHECK_CTA_LABEL,
  PUBLIC_SOUND_CHECK_SCHEDULING,
  PUBLIC_SOUND_CHECK_SUPPORTING_COPY,
  SCHEDULING_PROVIDER,
} from "@/config/site-scheduling";

/**
 * Sole public Calendly URL for prospective-couple consultation booking.
 * SOUND_CHECK = PUBLIC_ACQUISITION_CONSULTATION.
 */
export const CONSULT_CALENDLY_URL = PUBLIC_SOUND_CHECK_SCHEDULING.url;
