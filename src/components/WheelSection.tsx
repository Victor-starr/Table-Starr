"use client";
import { Button } from "pixel-retroui";
import Wheel from "@/lib/Wheel";
import WheelPopup from "./WheelPopup";
import { useWheel } from "@/hooks/useWheel";

interface WheelSectionProps {
  userWinner: string;
}
const WheelSection = ({ userWinner }: WheelSectionProps) => {
  const {
    data,
    mustSpin,
    prizeNumber,
    winMsg,
    wheelPopUp,
    handleSpinClick,
    onDeny,
    onAccept,
    onStopSpinning,
  } = useWheel(userWinner);

  return (
    <>
      {wheelPopUp && (
        <WheelPopup onDeny={onDeny} onAccept={onAccept} msg={winMsg} />
      )}
      <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
        <Wheel
          mustStartSpinning={mustSpin}
          onStopSpinning={onStopSpinning}
          data={data.map((item) =>
            item.option.length > 20
              ? { option: item.option.slice(0, 20) + "..." }
              : item
          )}
          prizeNumber={prizeNumber}
          fontSize={12}
          backgroundColors={[
            "#FF5733",
            "#33FF57",
            "#3357FF",
            "#FF33A1",
            "#FF8C33",
            "#33FFF5",
            "#F533FF",
            "#FF3333",
            "#33FF8C",
          ]}
          textColors={["#ffffff"]}
          fontWeight={"bold"}
          fontStyle="normal"
          textDistance={60}
          innerRadius={10}
          outerBorderWidth={5}
          innerBorderWidth={2}
          radiusLineWidth={2}
          perpendicularText={false}
        />
        <Button
          onClick={handleSpinClick}
          disabled={!userWinner}
          bg={userWinner ? "#335cff" : "#575757"}
          textColor={userWinner ? "#d1daff" : "#b0b0b0"}
          shadow={userWinner ? "#3900bd" : "#000000"}
        >
          {userWinner ? "Spin the Wheel" : "Select a user first"}
        </Button>
      </div>
    </>
  );
};

export default WheelSection;
