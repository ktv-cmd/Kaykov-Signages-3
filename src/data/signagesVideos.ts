import { InstagramVideoItem } from "@/components/InstagramVideoGrid";

// Import video files - using ?url suffix for Vite to properly handle MP4 files
import video1 from "@/assets/video signages /1 LVL UP Trend  2.mp4?url";
import video2 from "@/assets/video signages /2 Average Derm V2.mp4?url";
import video3 from "@/assets/video signages /2 KM SINGS VIDEO.mp4?url";
import video4 from "@/assets/video signages /4 tov.mp4?url";

// Import thumbnail images from thumbnails folder
import thumbnail1 from "@/assets/video signages /thumbnails/LVL UP.JPG";
import thumbnail2 from "@/assets/video signages /thumbnails/2 Average Derm V2..jpg";
import thumbnail3 from "@/assets/video signages /thumbnails/2 KM SINGS VIDEO.JPG";
import thumbnail4 from "@/assets/video signages /thumbnails/TOV Front .JPG";

export const signagesVideos: InstagramVideoItem[] = [
  {
    title: "LVL UP Trend Signage",
    description: "Front-lit LED channel letters signage project showcasing modern design.",
    videoSrc: video1,
    thumbnailSrc: thumbnail1,
    alt: "LVL UP Trend LED channel letters signage",
    instagramUrl: "https://www.instagram.com/kaykovsigns/",
  },
  {
    title: "Average Derm Signage",
    description: "Professional back-lit channel letters with premium materials and installation.",
    videoSrc: video2,
    thumbnailSrc: thumbnail2,
    alt: "Average Derm back-lit LED signage",
    instagramUrl: "https://www.instagram.com/kaykovsigns/",
  },
  {
    title: "KM Signs Showcase",
    description: "Comprehensive signage solutions featuring multiple installation types.",
    videoSrc: video3,
    thumbnailSrc: thumbnail3,
    alt: "KM Signs comprehensive signage showcase",
    instagramUrl: "https://www.instagram.com/kaykovsigns/",
  },
  {
    title: "Interior Signage Project",
    description: "Custom 3D letters indoor signage with professional lighting.",
    videoSrc: video4,
    thumbnailSrc: thumbnail4,
    alt: "Interior 3D letters signage project",
    instagramUrl: "https://www.instagram.com/kaykovsigns/",
  },
];

