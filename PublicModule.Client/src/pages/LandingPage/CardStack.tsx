import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

// --- Types & Data ---

interface CardData {
  title: string;
  description: string;
  src: string; // Giả lập hình ảnh hoặc màu
  color: string;
}

const projects: CardData[] = [
  {
    title: "Card Một",
    description:
      "Đây là card đầu tiên. Khi bạn cuộn xuống, card này sẽ lùi về sau và thu nhỏ lại để nhường chỗ.",
    src: "card1",
    color: "#BBACAF",
  },
  {
    title: "Card Hai",
    description:
      "Card thứ hai trượt lên đè lên card 1. Hiệu ứng parallax tạo cảm giác có chiều sâu 3D.",
    src: "card2",
    color: "#977F6D",
  },
  {
    title: "Card Ba",
    description:
      "Card cuối cùng. Đến đây scroll container sẽ kết thúc và bạn sẽ tiếp tục cuộn trang web bình thường.",
    src: "card3",
    color: "#C2491D",
  },
];

// --- Sub-Component: Card ---

interface CardProps {
  i: number;
  project: CardData;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  project,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef<HTMLDivElement>(null);

  // Logic animation: Biến đổi giá trị scroll (progress) thành giá trị scale
  // Khi progress đi từ giá trị range[0] đến range[1] -> scale đi từ 1 về targetScale
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    // Container bao ngoài: Set chiều cao h-screen và sticky để dính lại màn hình
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale, // Áp dụng animation scale
          backgroundColor: project.color,
          top: `calc(-10% + ${i * 25}px)`, // Xếp chồng lệch nhau xíu cho đẹp
        }}
        className="flex flex-col relative -top-[25%] h-[450px] w-[70%] md:w-[800px] rounded-3xl p-10 origin-top shadow-2xl border border-white/10"
      >
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          {project.title}
        </h2>
        <div className="flex h-full justify-center items-center">
          <p className="text-white text-lg text-center opacity-90">
            {project.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Component ---

const CardStack: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  // Hook theo dõi vị trí scroll của container này so với viewport
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main className="w-full relative">
      {/* Spacer đầu trang để test scroll */}
      <div className="h-[50vh] flex items-center justify-center bg-gray-100">
        <span className="text-black/50 font-medium">Scroll down 👇</span>
      </div>

      {/* Vùng chứa hiệu ứng Card Stack */}
      <div ref={container} className="relative mt-[10vh]">
        {projects.map((project, i) => {
          // Công thức tính scale: Card càng ở đầu mảng thì càng bị thu nhỏ nhiều khi bị đè
          const targetScale = 1 - (projects.length - i) * 0.05;

          return (
            <Card
              key={i}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* Spacer cuối trang */}
      <div className="h-[50vh] flex items-center justify-center bg-gray-100">
        <span className="text-black/50 font-medium">End of Stack Section</span>
      </div>
    </main>
  );
};

export default CardStack;
