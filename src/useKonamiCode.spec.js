import { renderHook, act } from "@testing-library/react-hooks";
import useKonamiCode, { konamiSequence } from "./useKonamiCode";

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

  it("should return true if the user types sequence right", () => {
    const { result } = renderHook(() => useKonamiCode());

    konamiSequence.forEach(key => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key }));
      });
    });

    expect(result.current.rightSequence).toBe(true);
});
})