import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAyah, getAyahEditions } from "@/services/quranService";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const AyahView = () => {
  const [reference, setReference] = useState("");
  const [edition, setEdition] = useState("en.asad");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["ayah", reference, edition],
    queryFn: () => getAyah(reference, edition),
    enabled: false,
  });

  const handleSearch = () => {
    if (reference) {
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter ayah reference (e.g., 2:255 or 262)"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>
          
          {data?.data && (
            <div className="space-y-4">
              <div className="text-2xl font-arabic text-right leading-loose">
                {data.data.text}
              </div>
              {data.data.translation && (
                <div className="text-lg text-muted-foreground">
                  {data.data.translation}
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                Surah {data.data.surah.name} ({data.data.surah.englishName}) - Verse {data.data.numberInSurah}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};