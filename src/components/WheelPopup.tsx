import { Button, Card } from "pixel-retroui";

interface WheelPopupProps {
  onDeny: () => void;
  onAccept: () => void;
  msg: string;
}
const WheelPopup = ({ onDeny, onAccept, msg }: WheelPopupProps) => {
  return (
    <section className="z-50 fixed inset-0 flex justify-center items-center bg-op-70">
      <Card
        bg="#fff"
        className="flex flex-col justify-center items-center shadow-2xl rounded-xl w-full max-w-md"
      >
        <h1 className="text-gray-900 text-2xl text-center">
          Are you accepting the wheel result?
        </h1>
        <p className="mb-5 text-gray-600">{msg}</p>
        <div className="flex gap-4 w-full">
          <Button
            onClick={onDeny}
            bg="#4f46e8"
            textColor="white"
            className="flex-1 text-lg transition"
          >
            Deny
          </Button>
          <Button
            onClick={onAccept}
            bg="#ef4444"
            textColor="white"
            className="flex-1 text-lg transition"
          >
            Accept
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default WheelPopup;
