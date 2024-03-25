import { useQuery } from "@tanstack/react-query";
import { getReportStats } from "../../services/apiInvoices";

export function useReports(id) {
  const { data: reportStats, isPending: isLoadingReportStats } = useQuery({
    queryKey: ["reportStats"],
    queryFn: () => getReportStats(id),
    refetchOnWindowFocus: false,
  });

  return { reportStats, isLoadingReportStats };
}
