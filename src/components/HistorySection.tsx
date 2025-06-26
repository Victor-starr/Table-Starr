import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "pixel-retroui";
import { timeAgo } from "@/utils/Time";
import { useTableContext } from "@/context/TableContext";

const HistorySection = () => {
  const { tableData } = useTableContext();

  if (!tableData) {
    return (
      <div className="mt-4">
        <h2 className="mb-4">History</h2>
        <p>Loading history...</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="mb-4">History</h2>
      <div className="px-2">
        <Accordion>
          {tableData.history.map((items, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>
                <p>
                  {items.username} <br />
                  {items.action}
                </p>
              </AccordionTrigger>
              <AccordionContent>{timeAgo(items.timestamp)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default HistorySection;
