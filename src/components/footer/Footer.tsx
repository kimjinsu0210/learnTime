import React from "react";
import { FaGithub, FaFigma } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import ScrollToTop from "../scrollToTop/ScrollToTop";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full py-2 text-center text-gray-700 bg-gray-200">
      <p>&copy; 2023 nbc 소고기 육전 All rights reserved.</p>

      <div className="flex justify-center mt-2 space-x-4">
        <a href="https://github.com/kimjinsu0210/learntime">
          <FaGithub size="30" color="#000000" />
        </a>
        <a href="https://www.figma.com/file/Z7JOaHPjk2P9OFT30aHYza?embed_host=notion&kind=&mode=design&node-id=0%3A1&t=xfAt3aN2MrMpyTDC-1&type=design&viewer=1">
          <FaFigma size="30" color="#000000" />
        </a>
        <a href="https://www.notion.so/2c8f3970ba3446f08280fe1b09d7c740">
          <SiNotion size="30" color="#000000" />
        </a>
      </div>
      <ScrollToTop />
    </footer>
  );
};

export default Footer;
