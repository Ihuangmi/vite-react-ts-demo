import React, { useState } from "react"; // 引入React和useState
import { motion } from "framer-motion"; // 引入motion

// 这个组件实现了一个文本组件，可以展开和收起文本内容
const TextComponent = ({ text }) => {
  // 定义TextComponent组件
  const [isExpanded, setIsExpanded] = useState(false); // 定义isExpanded和setIsExpanded

  const toggleExpansion = () => {
    // 定义toggleExpansion函数
    setIsExpanded(!isExpanded); // 设置isExpanded的值
  };

  return (
    // 返回组件
    <div style={{ width: "200px" }}>
      {" "}
      // 定义div样式
      {text.split("\n").map(
        (
          line,
          index // 遍历text
        ) => (
          <motion.p // 定义motion.p
            key={index} // 设置key
            style={{ display: isExpanded || index < 3 ? "block" : "none" }} // 设置样式
            initial={{ opacity: 0 }} // 设置初始opacity
            animate={{ opacity: 1 }} // 设置动画opacity
            transition={{ duration: 0.5 }} // 设置过渡时间
          >
            {line} // 显示line
          </motion.p>
        )
      )}
      {text.split("\n").length > 3 && ( // 判断text长度
        <motion.button // 定义motion.button
          onClick={toggleExpansion} // 点击事件
          initial={{ opacity: 0 }} // 设置初始opacity
          animate={{ opacity: 1 }} // 设置动画opacity
          transition={{ duration: 0.5 }} // 设置过渡时间
        >
          {isExpanded ? "收起" : "展开"} // 显示文字
        </motion.button>
      )}
    </div>
  );
};

export default TextComponent; // 导出TextComponent组件
