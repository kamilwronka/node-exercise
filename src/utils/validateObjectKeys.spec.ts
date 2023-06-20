import { validateObjectKeys } from "./validateObjectKeys";

describe("validateObjectKeys", () => {
  it("should return true if all of the required object keys are on place", () => {
    const requiredKeys = ["test1", "test2"];
    const testedObject = {
      test2: "test2",
      test1: "test1",
    };

    const isValid = validateObjectKeys(testedObject, requiredKeys);

    expect(isValid).toBe(true);
  });

  it("should return false some of the required object keys are missing", () => {
    const requiredKeys = ["test1", "test2", "test3", "test4"];
    const testedObject = {
      test1: "test1",
      test2: "test2",
    };

    const isValid = validateObjectKeys(testedObject, requiredKeys);

    expect(isValid).toBe(false);
  });

  it("should return true if all of the required object keys are on place, but there are additional keys in the tested object", () => {
    const requiredKeys = ["test1", "test2"];
    const testedObject = {
      test2: "test2",
      test1: "test1",
      test3: "test3",
      test4: "test4",
    };

    const isValid = validateObjectKeys(testedObject, requiredKeys);

    expect(isValid).toBe(true);
  });
});
