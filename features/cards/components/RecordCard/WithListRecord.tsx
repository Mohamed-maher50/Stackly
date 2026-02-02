import { useCallback, useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import WithClientAnimatedPresence from "@/components/WithClientAnimatedPresence";
import { ICard } from "@/features/cards/types";
import { useAppDispatch } from "@/lib/App.hooks";

import WithRecordDetailModal from "../../../lists/components/RecordDetailModel/WithRecordDetailModal";
import { updateCardThunk } from "../../store/thunks.api";
import RecordList from ".";

const WithListRecord = ({ card }: { card: ICard }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useAppDispatch();
  const onDoneToggle = useCallback(
    (status: boolean) => {
      dispatch(
        updateCardThunk({
          ...card,
          done: status,
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, card.id],
  );

  const onClose = useCallback(() => {
    setShowDetails(true);
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <RecordList
            card={card}
            onDoneToggle={onDoneToggle}
            onClick={onClose}
          />
        </DialogTrigger>
        {/* Card Detail Modal */}
        <DialogContent className="max-w-2xl overflow-auto max-h-[90vh] w-full min-w-1/2">
          <WithClientAnimatedPresence>
            {showDetails && (
              <WithRecordDetailModal
                card={card}
                onClose={() => {
                  setShowDetails(false);
                }}
              />
            )}
          </WithClientAnimatedPresence>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WithListRecord;
