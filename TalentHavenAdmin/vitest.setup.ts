import { MsalReactTesterPlugin } from "msal-react-tester";
import { waitFor } from "@testing-library/react";
import { vi, expect } from "vitest";

// Initialize the MSAL React Tester plugin
MsalReactTesterPlugin.init({
  spyOn: vi.spyOn,
  expect: expect,
  resetAllMocks: vi.resetAllMocks,
  waitingFor: waitFor,
});