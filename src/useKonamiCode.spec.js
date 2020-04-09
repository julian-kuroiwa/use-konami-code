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

  it("should return true if the user types sequence right", () => {
    const { result } = renderHook(() => useKonamiCode());

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k" }));
    });

    expect(result.current.rightSequence).toBe(false);
  });

  it("should return true if the user types a new sequence right", () => {
    const newSequence = ["k", "j"];
    const { result } = renderHook(() => useKonamiCode(newSequence));

    newSequence.forEach(key => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key }));
      });
    });

    expect(result.current.rightSequence).toBe(true);
  });

  it("should run a callback if the right sequence is typed", () => {
    const callback = jest.fn();
    const newSequence = ["k", "j"];
    const { result } = renderHook(() => useKonamiCode(newSequence, callback));

    newSequence.forEach(key => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key }));
      });
    });

    expect(callback).toHaveBeenCalled();
  });
})