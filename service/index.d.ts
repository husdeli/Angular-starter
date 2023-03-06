declare const trafficMeister: {
  fetchData(cb: (err: string, data: unknown[]) => void): void;
};

declare module 'trafficMeister' {
  export default trafficMeister;
}
