import { renderHook, act } from "@testing-library/react-hooks";
import useKonamiCode from "./useKonamiCode";

describe("Use Konami Code", () => {
  it("should return the user sequence", () => {
    const { result } = renderHook(() => useKonamiCode());

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", {
        key: "ArrowUp"
      }));
    })

    expect(result.current.sequence).toEqual(["ArrowUp"]);
  });
})