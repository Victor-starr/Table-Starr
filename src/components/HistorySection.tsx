import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "pixel-retroui";
import { Table } from "@/lib/types";
import { timeAgo } from "@/utils/Time";

type HistorySectionProps = {
  tableData: Table;
};
const HistorySection = ({ tableData }: HistorySectionProps) => {
  return (
    <div className="mt-4">
      <h2 className="mb-4">History</h2>
      <div className="p-2 w-auto max-h-80 overflow-y-scroll">
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
