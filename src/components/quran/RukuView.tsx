import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import * as QuranService from "@/services/quranService";

export const RukuView = () => {
  const [selectedRuku, setSelectedRuku] = useState("1");
  const [selectedEdition, setSelectedEdition] = useState("en.asad");

  const { data: rukuData, isLoading } = useQuery({
    queryKey: ["ruku", selectedRuku, selectedEdition],
    queryFn: () => QuranService.getRuku(selectedRuku, selectedEdition),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedRuku} onValueChange={setSelectedRuku}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Ruku" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(556)].map((_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                Ruku {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedEdition} onValueChange={setSelectedEdition}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Edition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en.asad">Muhammad Asad</SelectItem>
            <SelectItem value="en.pickthall">Pickthall</SelectItem>
            <SelectItem value="quran-uthmani">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <div className="space-y-6">
            {rukuData?.data?.ayahs?.map((ayah: any) => (
              <div key={ayah.number} className="pb-4 border-b last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    {ayah.surah.name} - Verse {ayah.numberInSurah}
                  </span>
                </div>
                <p className="text-lg leading-relaxed">{ayah.text}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default RukuView;