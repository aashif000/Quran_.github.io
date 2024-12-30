import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import * as QuranService from "@/services/quranService";

export const SearchView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEdition, setSelectedEdition] = useState("en.asad");

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", searchQuery, selectedEdition],
    queryFn: () => QuranService.searchQuran(searchQuery, "all", selectedEdition),
    enabled: searchQuery.length > 2,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search the Quran..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Select value={selectedEdition} onValueChange={setSelectedEdition}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Edition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en.asad">Muhammad Asad</SelectItem>
            <SelectItem value="en.pickthall">Pickthall</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : searchResults?.data?.matches ? (
        <div className="space-y-4">
          {searchResults.data.matches.map((match: any) => (
            <Card key={match.number} className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  {match.surah.englishName} - Verse {match.numberInSurah}
                </span>
              </div>
              <p className="text-lg leading-relaxed">{match.text}</p>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">
            {searchQuery.length > 2 ? "No results found" : "Enter at least 3 characters to search"}
          </p>
        </Card>
      )}
    </div>
  );
};