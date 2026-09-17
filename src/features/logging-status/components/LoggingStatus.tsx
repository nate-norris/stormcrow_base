import { LastQE } from "./LastQE";
import { SitesConnectionStatus } from "./SitesConnectionStatus";
import { SitesOverThreshold } from "./SitesOverThreshold";
import { SitesOverMax } from "./SitesOverMax";

export function LoggingStatusView() {

  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <LastQE />
      <SitesConnectionStatus />
      <SitesOverThreshold />
      <SitesOverMax />
    </div>
  );
}