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
    <section className="border bg-gray-300 text-black w-4/5 p-2 rounded-2xl my-3 mx-auto">
      <div className="flex justify-evenly items-center">
        <div>
          {isEditing
            ? `Change ${activeGame.game.name}`
            : `Add ${activeGame.name}`}{" "}
          to :
        </div>
        <select
          name="status"
          id="status"
          value={selectedStatus}
          className="border border-gray-700 bg-gray-900 rounded-xl outline-none p-1 mx-2 text-gray-200 text-sm"
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
      <div className="flex justify-between items-center w-9/10 mx-auto relative">
        <div className="w-20 mx-5">Platform(s):</div>
        <div className="flex max-w-full overflow-x-scroll custom-scroll">
          {activeGame.platforms?.length > 0 ? (
            activeGame.platforms.map((pf: string) => (
              <label key={pf} className="text-sm flex items-center">
                <input
                  type="checkbox"
                  name="platforms"
                  id="platforms"
                  className=""
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
                <span className="block">{pf}</span>
              </label>
            ))
          ) : (
            <span>No Platform data available</span>
          )}
        </div>
      </div>

      {/* Score */}
      <div className="flex justify-around items-center">
        <span>Score:</span>
        <select
          name="scores"
          id="score"
          value={selectedScore ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedScore(val === "" ? null : val);
          }}
          className="outline-none"
        >
          <option value="">-</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <div className="flex justify-between w-1/4">
          <button
            onClick={() => {
              confirmAddGame(selectedStatus);
            }}
            className="rounded-lg border border-black px-1 py-0.5 text-sm bg-gray-400 hover:bg-blue-900 hover:text-gray-200 transition-colors"
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
            className="text-sm border rounded-lg px-1 py-0.5 hover:bg-gray-400 bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
