export const runtime = 'edge'
import { DataGempaTemplate, DataGempaType } from "@/types/dataGempa";

export default async function getDataGempa() {
  let dataGempa: DataGempaType = DataGempaTemplate;
  try {
    const fetcher = await fetch(
      "https://bmkg-content-inatews.storage.googleapis.com/datagempa.json",
      { cache: "no-cache" }
    );
    const data = await fetcher.json();
    const coordinates_lng_lat = data?.info?.point?.coordinates?.split[","] || [0, 0];
    dataGempa = {
      sent: data?.sent || "",
      date: data?.info?.date || "",
      time: data?.info?.time || "",
      eventid: data?.info?.eventid || "",
      area: data?.info?.area || "",
      potential: data?.info?.potential || "",
      subject: data?.info?.subject || "",
      headline: data?.info?.headline || "",
      description: data?.info?.description || "",
      instruction: data?.info?.instruction || "",
      magnitude: parseFloat(data?.info?.magnitude) || 0,
      latitude: parseFloat(coordinates_lng_lat[1]) || 0,
      longitude: parseFloat(coordinates_lng_lat[0]) || 0,
      depth_km: parseFloat(data?.info?.depth?.trim().split(" ")[0]) || 0,
    };
    console.log(data);
    console.log(dataGempa);

    return dataGempa;
  } catch (error) {
    console.log(error)
  }
}
