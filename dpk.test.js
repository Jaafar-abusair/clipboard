const { deterministicPartitionKey, createHash } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () =>
{
  it("Returns the literal '0' when given no input", () =>
  {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKey", () =>
{
  it("Returns with string input", () =>
  {
    let event = "test";
    const trivialKey = deterministicPartitionKey(event);

    const data = JSON.stringify(event);
    expected = createHash(data);

    expect(trivialKey).toBe(expected);
  });
});

describe("deterministicPartitionKey", () =>
{
  it("Returns with partitionKey less than 255", () =>
  {
    let event = { partitionKey: "test" };
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(event.partitionKey);
  });
});

describe("deterministicPartitionKey", () =>
{
  it("Returns with partitionKey more than 255", () =>
  {
    let event = { partitionKey: "testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12" };
    const trivialKey = deterministicPartitionKey(event);

    expected = createHash(event.partitionKey);

    expect(trivialKey).toBe(expected);
  });
});

describe("deterministicPartitionKey", () =>
{
  it("Returns without partitionKey", () =>
  {
    let event = { test: "testtest12testtest12testtest12teesttest122testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12" };
    const trivialKey = deterministicPartitionKey(event);

    const data = JSON.stringify(event);
    expected = createHash(data);

    expect(trivialKey).toBe(expected);
  });
});

describe("deterministicPartitionKey", () =>
{
  it("Returns without partitionKey more than 255", () =>
  {
    let event = { test: "testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12testtest12" };
    const trivialKey = deterministicPartitionKey(event);

    const data = JSON.stringify(event);
    expected = createHash(data);

    expect(trivialKey).toBe(expected);
  });
});

