import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getManzil } from "@/services/quranService";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const ManzilView = () => {
  const [manzilNumber, setManzilNumber] = useState("");
  const [edition, setEdition] = useState("en.asad");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["manzil", manzilNumber, edition],
    queryFn: () => getManzil(manzilNumber, edition),
    enabled: false,
  });

  const handleSearch = () => {
    if (manzilNumber) {
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="number"
              min="1"
              max="7"
              placeholder="Enter Manzil number (1-7)"
              value={manzilNumber}
              onChange={(e) => setManzilNumber(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>
          
          {data?.data?.ayahs && (
            <div className="space-y-6">
              {data.data.ayahs.map((ayah: any, index: number) => (
                <div key={index} className="space-y-2 border-b border-border pb-4 last:border-0">
                  <div className="text-2xl font-arabic text-right leading-loose">
                    {ayah.text}
                  </div>
                  {ayah.translation && (
                    <div className="text-lg text-muted-foreground">
                      {ayah.translation}
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground">
                    Surah {ayah.surah.name} - Verse {ayah.numberInSurah}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};