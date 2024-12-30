import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import * as QuranService from "@/services/quranService";

export const CompleteQuran = () => {
  const [arabicEdition, setArabicEdition] = useState("quran-uthmani");
  const [englishEdition, setEnglishEdition] = useState("en.asad");

  const { data: arabicQuran, isLoading: isLoadingArabic } = useQuery({
    queryKey: ["quran", arabicEdition],
    queryFn: () => QuranService.getQuran(arabicEdition),
  });

  const { data: englishQuran, isLoading: isLoadingEnglish } = useQuery({
    queryKey: ["quran", englishEdition],
    queryFn: () => QuranService.getQuran(englishEdition),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Select value={arabicEdition} onValueChange={setArabicEdition}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Arabic Edition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quran-uthmani">Uthmani</SelectItem>
            <SelectItem value="ar.alafasy">Al-Afasy</SelectItem>
          </SelectContent>
        </Select>
        <Select value={englishEdition} onValueChange={setEnglishEdition}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select English Edition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en.asad">Muhammad Asad</SelectItem>
            <SelectItem value="en.pickthall">Pickthall</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Arabic Text */}
        <Card className="p-6 bg-white/90 dark:bg-gray-800/90">
          <h2 className="text-2xl font-bold mb-4 text-right">النص العربي</h2>
          {isLoadingArabic ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-6 text-right">
              {arabicQuran?.data?.surahs?.map((surah: any) => (
                <div key={surah.number} className="border-b pb-4 last:border-0">
                  <h3 className="text-xl font-bold mb-2">{surah.name}</h3>
                  {surah.ayahs.map((ayah: any) => (
                    <p key={ayah.number} className="text-lg leading-loose">
                      {ayah.text} ﴿{ayah.numberInSurah}﴾
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* English Translation */}
        <Card className="p-6 bg-white/90 dark:bg-gray-800/90">
          <h2 className="text-2xl font-bold mb-4">English Translation</h2>
          {isLoadingEnglish ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {englishQuran?.data?.surahs?.map((surah: any) => (
                <div key={surah.number} className="border-b pb-4 last:border-0">
                  <h3 className="text-xl font-bold mb-2">{surah.englishName}</h3>
                  {surah.ayahs.map((ayah: any) => (
                    <p key={ayah.number} className="text-lg leading-relaxed">
                      {ayah.text} ({ayah.numberInSurah})
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};