import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import * as QuranService from "@/services/quranService";

export const PageView = () => {
  const [pageNumber, setPageNumber] = useState("1");
  const [selectedEdition, setSelectedEdition] = useState("en.asad");

  const { data: pageData, isLoading } = useQuery({
    queryKey: ["page", pageNumber, selectedEdition],
    queryFn: () => QuranService.getPage(pageNumber, selectedEdition),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="number"
          min="1"
          max="604"
          value={pageNumber}
          onChange={(e) => setPageNumber(e.target.value)}
          placeholder="Enter page number (1-604)"
          className="flex-1"
        />
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
        <Card className="p-6 bg-white/90 dark:bg-gray-800/90">
          <div className="space-y-6">
            {pageData?.data?.ayahs?.map((ayah: any) => (
              <div key={ayah.number} className="pb-4 border-b last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    {ayah.surah.englishName} - Verse {ayah.numberInSurah}
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