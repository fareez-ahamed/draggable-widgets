import { moveItem } from "./Dashboard";

describe("Dashboard test", () => {
  it("should replace item correctly when from < to", () => {
    expect(
      moveItem(
        [
          { id: "a", content: "A" },
          { id: "b", content: "B" },
          { id: "c", content: "C" },
          { id: "d", content: "D" },
          { id: "e", content: "E" },
          { id: "f", content: "F" },
          { id: "g", content: "G" },
          { id: "h", content: "H" },
          { id: "i", content: "I" },
          { id: "j", content: "J" },
        ],
        0,
        4
      )
    ).toEqual([
      { id: "b", content: "B" },
      { id: "c", content: "C" },
      { id: "d", content: "D" },
      { id: "e", content: "E" },
      { id: "a", content: "A" },
      { id: "f", content: "F" },
      { id: "g", content: "G" },
      { id: "h", content: "H" },
      { id: "i", content: "I" },
      { id: "j", content: "J" },
    ]);
    expect(moveItem([1, 2, 3, 4, 5], 2, 4)).toEqual([1, 2, 4, 5, 3]);
    expect(moveItem([1, 2, 3, 4, 5], 0, 3)).toEqual([2, 3, 4, 1, 5]);
    expect(moveItem([1, 2, 3, 4, 5], 0, 2)).toEqual([2, 3, 1, 4, 5]);
  });
  it("should replace item correctly when to < from", () => {
    expect(moveItem([1, 2, 3, 4, 5], 3, 1)).toEqual([1, 4, 2, 3, 5]);
    expect(moveItem([1, 2, 3, 4, 5], 4, 0)).toEqual([5, 1, 2, 3, 4]);
    expect(moveItem([1, 2, 3, 4, 5], 4, 3)).toEqual([1, 2, 3, 5, 4]);
  });
});
