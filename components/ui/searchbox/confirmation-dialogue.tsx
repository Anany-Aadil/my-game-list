import { statusTypes } from "@/lib/status-type";

export default function ConfirmationDialogue({
  isEditing,
  activeGame,
  selectedStatus,
  setSelectedStatus,
  chosenPlatforms,
  setChosenPlatforms,
  selectedScore,
  setSelectedScore,
  confirmAddGame,
  setPendingGame,
  setEditingGame,
}: {
  isEditing: boolean;
  activeGame: React.ComponentState;
  selectedStatus: React.ComponentState;
  setSelectedStatus: React.SetStateAction<any>;
  chosenPlatforms: React.ComponentState;
  setChosenPlatforms: React.SetStateAction<any>;
  selectedScore: React.ComponentState;
  setSelectedScore: React.SetStateAction<any>;
  confirmAddGame: any;
  setPendingGame: React.SetStateAction<any>;
  setEditingGame: React.SetStateAction<any>;
}) {
  return (
    <section className="border bg-neutral-300 text-neutral-900 w-4/5 p-2 rounded-2xl my-4 mx-auto">
      <div className="flex flex-col md:flex-row justify-between w-9/10 mx-auto items-center py-1 border-b border-neutral-400 md:text-center">
        <div className="mx-5">
          {isEditing ? (
            <>
              Change <span className="font-bold">{activeGame.game.name}</span>
            </>
          ) : (
            <>
              Add <span className="font-bold">{activeGame.name}</span>
            </>
          )}{" "}
          to :
        </div>
        <select
          name="status"
          id="status"
          value={selectedStatus}
          className="border border-neutral-700 bg-neutral-900 rounded-xl outline-none p-1 mx-2 text-neutral-200 text-sm font-iceberg"
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="unselected">-Select-</option>
          {statusTypes.map((status) => (
            <option key={status.type} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {/* Platform Selection */}
      <div className="flex justify-between w-9/10 mx-auto items-center py-1 border-b border-neutral-400">
        <div className="w-20 mx-5">Platform(s):</div>
        <div className="max-w-full flex overflow-x-auto custom-horizontal-scroll font-asimovian">
          {activeGame.platforms?.length > 0 ? (
            activeGame.platforms.map((pf: string) => (
              <label
                key={pf}
                className="text-sm flex items-center px-1 pb-0.5 shrink-0 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="platforms"
                  className="peer hidden"
                  checked={chosenPlatforms.includes(pf)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setChosenPlatforms((prev: any[]) => [...prev, pf]);
                    } else {
                      setChosenPlatforms((prev: any[]) =>
                        prev.filter((p) => p !== pf),
                      );
                    }
                  }}
                />
                <span className="w-3.5 h-3.5 border border-neutral-900 peer-checked:bg-indigo-400 rounded flex items-center justify-center peer-checked:border-indigo-400 peer-checked:text-neutral-900 text-transparent">
                  ✓
                </span>
                <span className="px-2 whitespace-nowrap">{pf}</span>
              </label>
            ))
          ) : (
            <span>No Platform data available</span>
          )}
        </div>
      </div>

      {/* Score */}
      <div className="flex justify-between w-9/10 mx-auto items-center py-1">
        <span className="mx-5">Score:</span>
        <select
          name="scores"
          id="score"
          value={selectedScore ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedScore(val === "" ? null : val);
          }}
          className="border border-neutral-700 bg-neutral-900 rounded-lg outline-none p-1 mx-2 text-neutral-200 text-sm w-12 font-exo"
        >
          <option value="">-</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <div className="flex justify-between flex-1 md:w-1/5 font-delius">
          <button
            onClick={() => {
              confirmAddGame(selectedStatus);
            }}
            className="rounded-lg border border-neutral-900 px-2 md:text-sm text-xs bg-neutral-400 hover:bg-blue-800 hover:text-neutral-200 transition-colors cursor-pointer"
            disabled={
              chosenPlatforms.length === 0 || selectedStatus === "unselected"
            }
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setPendingGame(null);
              setEditingGame(null);
            }}
            className="md:text-sm text-xs border border-neutral-900 rounded-lg px-2 md:py-0.5 hover:bg-neutral-400 bg-neutral-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
