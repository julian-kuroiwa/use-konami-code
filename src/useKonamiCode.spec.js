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

  it("should reset sequence if the user types a wrong sequence", () => {
      const { result } = renderHook(() => useKonamiCode());
  
      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", {
          key: "ArrowUp"
        }));

        window.dispatchEvent(new KeyboardEvent("keydown", {
          key: "k"
        }));
      })
  
      expect(result.current.sequence).toEqual([]);
  });
})