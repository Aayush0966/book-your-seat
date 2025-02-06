'use client'

import React, { useState } from 'react';
import { Calendar, Clock, Star, Users, Film, ThumbsUp, Share2, Heart, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ShowDetails = () => {
  const [selectedDate, setSelectedDate] = useState('2024-02-07');
  const [selectedTime, setSelectedTime] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  
  const movie = {
    title: "Dune: Part Two",
    rating: "PG-13",
    duration: "166 min",
    genre: ["Science Fiction", "Adventure", "Drama"],
    score: 4.8,
    totalReviews: 2845,
    synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    releaseDate: "March 1, 2024",
    posterUrl: "/api/placeholder/300/450"
  };

  const showTimes = {
    "2024-02-07": ["10:30 AM", "1:45 PM", "4:30 PM", "7:15 PM", "10:00 PM"],
    "2024-02-08": ["11:00 AM", "2:15 PM", "5:00 PM", "7:45 PM", "10:30 PM"],
    "2024-02-09": ["10:00 AM", "1:15 PM", "4:00 PM", "6:45 PM", "9:30 PM"]
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    // Show booking confirmation alert
    setTimeout(() => {
      setSelectedTime(null);
    }, 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: `Check out ${movie.title}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center align-middle items-center bg-background dark:bg-dark-background text-dark-text dark:text-text">
      {/* Main Content */}
      <div className="max-w-7xl flex min-h-screen mx-auto px-4 sm:px-6 lg:px-8 z-10 justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster Card */}
          <div className="group">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="relative">
                <img
                  src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIATgBAgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAECBAYDB//EAEMQAAIBAwMBBgMGBQIFAgYDAAECAwAEEQUSITEGEyJBUWEycYEUQpGhscEjUtHh8DNiFSRykvEWggdVY5PS0zQ1U//EABkBAAMBAQEAAAAAAAAAAAAAAAACAwEEBf/EACURAAICAgICAgMAAwAAAAAAAAABAhEDIRIxIkEEURMycRQjUv/aAAwDAQACEQMRAD8AalT0qseWNSp8UqAGpU+KVADUqfFKgBqVPSoAalT0qAGpU+KVADUqelQA1KnpUANSp6WKAGpU9KgBqVPSoAalT0qAGpU9LFADUqfFKgBqVPSxQA1Knp6AFSpUqAFSp6VADUqelQA1KnpUANSp6VADUqelQA1KnoTrl/3ECpDIO9k+EZ8qxukNCDk6RdlvII32GQF/5RzXBdZ08uEecI3TGR/Ws9BcRmN1AM56Oz5Cj6efyOT7VzbUba2YsyQhgfi7pct8uf1xUHkk+jtXx4JbNik0DxmRbiLYPvbuKSXFrIcJdwMfZ689v9Tju2377iVl6FlGFPsOlVY9Xy4WZcsOjFRkfWtU50Z/jwPUXUIMlhj1FMoDLlSCPUGsBZa7NbOoWX+G3ADHKH+h/wAzR+21QSkSwHZMD44/I+x/rWfkkuzH8aPo0BGKautmy31uXQEMBkj0rmRg4q0ZKRyzg4PY1KnpUwg1KnpUANSp6VADUqelQA1KnpUANSp6VAD4pYqVLFAEcUsVLFLFAEcUsVLFLFAEcUsVLFLFAEcU9PiligCOKWKlioyusUbO5wqjJNAHO4lWCJncgY6c9TXnOpXVxNIUQbOcAhMH8aNazfTTXDDvFWPPhXeMEetAgI1chNkknmR8Ce/vUJStnoYMfBWzm108UCWtsrOfMg4yf6VyWIA75VEj+m4kCu7GNRjJbd8RHV/b2UVOCEyzLG42oOSo6nHlWFjnG7qi95jDHwoFHP0q2bZSFW4MUG7oksmD/wBvGKtItvbQvqd04GSVi9gOPD7k+n5c1STWIZmKRWjCM8EnZj6qR+9ZtmDXeiSoubYoyn7ueDXGKWW0Ze8BV1GOvxD0q4HkZgbZDH6x9VPyq+sF13RY2plYjhDnB+dF+mFMK9mtbRQHz4sZx646/UUfaWNphsYbX8Sn0FeZ3NrqdhN9oltnhDHcCFwP7Ud0PVd6bpD4liIBY+e7+maE+L0TyY+SNczIG2huvTIxmnxVa3j+1pDPFOksUXiIU8gkcZ9qt4q8XZwzjxdEcUsVKlimEI4pYqWKWKAI4pYqWKWKAI4pYqWKWKAI4pVLFKgCWKenpsUALFLFPSxQA1KnpYoAalT4pUANSp8UsUANWX7Wa0sUP2a0nTLH+IUIJGPKtQ6b0ZSSNwxkeVeW9sFSLWjaxBVSGNFO0YGcelLLo6PjxUpbKMt2MkZOPQHp7A+lRR2ZMAbF+fLGuKw7efj984qW8A8Yz61OjvLKEIcjkjq2efkKuRSd3eI7cAnPXqDn9v1oZ32E9ST09hVyAmYs5GQIyD7VgVZPXY5Bb267iyRARgfIc1d7L6S1wC0q4RumRVywW11G3CS+IowyPUjzrV6fCkaqsahVHAAqblqjUddO7P28bA4rT2NlFEQQoIxVSz2EDFFouFFEVZKbYrvTLa+gaGeMMjDBFeSa/ocmgaybRNzQuQ8THrj+37V7ND4gCKzPbu2jcWdxIoLJJ3efZsf0ppaVmQlToBQj7LHZzglSxKuPLkeftRN1Cnw9DyKCzu08JtgcMnPyo2eQp6jaB+VNibsh8haTI0sU+KWKucg1LFPiligBsU2KlSxQBHFLFSxSoAbFNUqVAEsUsVPFLFAEMUsVPFLFAEKWKniligCGKWKmKRFAEKWKniligDjNIsUTSPwqjJNeZdpik2syzW7Eq3RvX/P2r0y87wQsIwpyCDuDH9K8oup0nklUuAQSMgVPI2dnxV2yjMccMCvtVfdzXeBJJG2cHOeT5AU72uQdhBYcEA5pE6O2iNtGZpVWjVuEUbGO2Er42826eEfj1qlpkEaSA3TbYzwTnA+tEbmW1V2W32/CQZDz6fDSt7NRS0u8+yzblZlPlnkY9xWkHa8RYZbVWQccHmskLSZkacLsQHir+laTHczxLczGOFhmRucr8h5n+tFJmSNfpfbexdsSh4mz6ZrZ6drNvdwF4W3CvGJ9MmhumWFHeMN4WYYyPWvSewmnD7KyuMM3lSvXQkoqrNnY3kbKB3i5J6E81m//AIl3ggs7EAjMk/Bz6A/1rz29vbvUNUuI4ZJo44ZG24PO1ScnHU9PKumuXNxLptrDLKZ2Zu8UjkbRxn5Gm9UxeG9BvThNkPKTuYHIx1wa0gZnwWC4wMEef0rIaNNcT3UO8YXADN6jz/IVsEA28GtxLZD5L0NSqeKWK6DiIUqniligCGKWKniligCGKWKnimxQBGlU8UqAJUqliligCNLFSxUJpFiTc2T6AdTQA+OvsMk+grM6t2mihBW2lCoThZu7LbsdcdBTalHPe2jvcJMiMTnbL4SAcDgDGcZPnWPvYjFB3SozOXJVjzsGeMUjkdUMS9na+7R6ibmT7PqE5TPgY+HI9xV/Re2tzBII9TInjJ/1AAGX+tZZkIyCMfSoEcetFlnCLVM9ptbiG6gWe3cPG3RhXXFeY9kNbk0y67hyWt35Kk/pXp0bJJGrowKMNwb1HrTJ2ceTG4MRHBHrXiOrQtbancxMc93Ky/ga9Tsu1WnXc5jzJEMkK7gbW9Dx61552waJu0F28HKsQc4I3HzPNYy/x04tplGwAaObB8YH4D/ziiOmQhJEimRlZgeT+NBre4kt51lixuHkehHpWjXWLE24ZSVZV4iz51GaO6Mi1b6YWmfnauzwnAPOahHp0UdyFk8ZUZUN0PqKOQDdGr/zDNc5IF37/OpWbZasorS6jj3xKceWMYPyorFplsRmOIZPqKGafiOUkYINHoZRsHtWGMptYQBuUGaJ6Gj214pj+A9RQt72BLsrcvsiAzk1Y0/tBpUc57q4D5PBByKF2DTosSdnGh1O4eB1RZ2bdhFztJzjOKyXam0jte0DWSLiKGBOnnnk/qK9Q+0RXMaSRnPHBrzi+t5dd7WatcQn+BD/AAA3kzqAMfiKrRBSrbJdmrcySTTSc8BUHko86IX2v2NptVZUlYg/C3H40K1S7XTdHjgA2Tyrhs8EDz/GsfLMqW5WJ8CRvF155/WmWlSJuP5G2zZxa/czq7xMka543Dhf60Rnuru0sUup5EAbGNyjB+mR+tedW1y1vInUp1AY8E1prvU31OyhtE2lyQPhyQPp08v71qb9mSxpPRqNN1JL6MME2NnBAOR7fSr5BrL6DY31tLkIRxhlCnDCtk9vi1SfnPRgaeMrOfJCuirSqWKbFOSGpYp8UsUANSqWKVAD4pYqeKWKDSGKpakjyKqxjL+Qzj0zRDFVbvaJrfI5Zwg+Z4pZuoj41ckWu1FkNP0TT7RIwRjMjHqSeT+dZX7LCQSYwSfOpdq+1c2oavJEjW/2aKRlTDHJAPXNUr69uIIgU7pVK53Nk4rmnd0ehCIN1zTVKu0EY5548qyrKUJ3Aj2rYxXXfsUkvQJOmxoNoqlrOniNe8GM+ePOti3F0xmrM2CUZZFPKnOa9K7LynUNIuLGWRh4MBlOGCsD0+ufxrzmOCSRnRELLjyrVaBdiCaMM7RxTxd07KcEBuMj5dardMjkjcSixW0ubiJImurRHKieNMMcee3PI46j8K5TpBc2++JknjHkfu/uDRrUVj0B4bG/2CN1JhmiBAIGOo+6efU/OgepJC7iVf8AUxxLHw2Pf1FaLF3sCXVtGmShwB91v2NVdpU+9XrosR4irEeYGM/MVxRCUOMEeY9KC1m47P3sd3p8ZUjco2sD5EVaducVhLOeayl722bB+8jdDWgtddt7hR3gMcgHQ1GUGOmH4Dgii1sVx4mAFZ2C7QjKsD8q6SXXegx96YgeCw61MYPaha299B3WwPVHS+x6rdwTSRfwWbBVRgceRoBISjiNtYuliPngftRvRtNCqqw9oJAsnOEHU/LNMkNxddm8mVLVP4KiNFXwqOg9qEwwRwIEhQInJwPU+dW5HkEEcMsnesvxPjG7yFcq6YLVnlZpXKjyvtrcN/xu5iX4dwB4zzgUDAZtu3ZwMcHNFO1EUUHaO+SFTs7zPJzgkZP5mqCQqi7yGz6Ur7OyH6o72loZ2AL4XOMZ6+9bTQrKGzjzGuX6lj50A7P2u8vNIo4OAKKXWrS2mEgEYb/cMn8KjJ26HSPQtFdyuCAc0Q1ZA9irAYKPg/I15zB2i1KwuYDJCrqw54wD9QTWtOqXjTLAYY3s7lN/e5IKnrgfI8VSDohli2mxsU2KnilirnEQxSxU8UsUAR5pVPFNWmEqVSxSxWGkaq3cscerackhAVZY2fP/AFdPz/KrnC8njFZntBP4dynayqAH9DnOfxFSyv0dHx47bLWp6dHrXaJo7grDETtURoPDGB5fTJoRed1Jcl1h2W7N/DQ8hV8h+FGWk02ZE1O/NyRPFmK3tgS0hPVeOc5yPpWaaePvSzxTJ4jwQSR7e9QbO+MQqkEcaDw5XHGeaD62w7hh5c0WjlDRZ5C+WRihGt7fs5yQDSr9jWqQCto22lFBLNwMeZqzET3a5HGMV30y3kGi3V+wIKMFjP8AKfX9qcWwjshIQc4Xy65J61VolyT0h+0rS6hoVq7AyPbOcN1IQjDD8QprMwySR/D09D0rW2L53wsfAeSCMigVzaQRXUiFwYweAh/KnUvsVKtFCZw/ITBxzVxbZGhQlQSF+NTtP41Zt0sHOxrctn7zOaJQ6LaygtaySwk+jbh+BFbyRrTALWzY8J3j0xhh8x5/T8KpyxFSeOfXFHL63uLBgLyMbT8MqfCf3BqpIysvIDjyP963sy6KNtdSQEYyV9qP6Vd2d/ILeZpI5G6Z6H5GghiGePwqIhIYPGSGByDSyimOpHounaFp7MO9ZnB9WrR2mgaXbp9rtQVKj4Qc815nY6pfRxjA3ncqLz8WTj+n41s/+OwadF9na5SeQfE4I2D5c0kY09iZJutGg69afGayi9rXjn2SpBKrH7oZGH4nB/EUdtdWt7lQdux/TOQf8/zyzdTRxPFJbPOO2USQdpLqQqfE6uR13Agf0qzb2qsFfAa0kVdrD5dT9aO9o+ytxrGpNeLdRRW5VSCQc4A5P/msNBfPbNJHaXDNas7CPcOceR9s1Ocb2duGaao0Gm3KQsYgcYYj580cgNpN4Z4gzetYm5ZkjRwx3EA59+tEdM1R3KxlN7npjqam4sdNGgv0tbeaFRsUkEgt0UCtH2d1C1vNNnghlV3gKtkc5zxxWK1KSa4h7qR48kgBQAT70Z0W8n0k29hcxPFFKm5VYfHjqfemhp2yeTyhSNTSqlp2sadqLlLS6V5F6xnwsPoav4roPPaaI0sVLFLFAEaVSxSoAnSxT4pYrQK90cR7P5ztrL66m9XVec8D5YNaW+kCSR5P3T0PnkVk9YmYv3QwCVYE+mTj+tc035nbhVRCWnr9jsNOF8yQLGF2T7hwzA5x+NUmSKKeZQ7NtYglwAfwofrl41/HHGWaOKIYQbPlz+VBj9qjjCrIsu0+HJxgY6UrimWjJrsMXupxxnbGCze3Sgd/NJMpeZx7IDVWdbo5MiyfJen5Vyjt5pjiOCVvktbGCQzkGLfXTJpbaXHaKiuBvkMpbJBHIGOM4FdIL1GiS2lRjEuCyqepAxn9fxodBp88RyQokI4BarEFvs/1DubPl0pm9k0kjpiflbZGaRhtTHv50QtexN9Lbq5lj3n7ua76VtjR5SviLhR7ADP9K1enXuVVcdKm5bodJ1Zg7nszqVnlpIshecqMiudtqDWsihsjHkRmvX7crNHtcZB8qxvbfQxGBcRRKqDqVXH6Vv8AQ5IjEbfVbFoZUDxuOnQg+orB6ppc2lXLRMR1OCPMetaTSZiuAJCo+8ME1x7RR/aIhKr940JKlsYJU8g00dOhDPwXER8F1FlT95a6SW6Y3wOJIj+K1wMYpcxeJSQfbzqphNGO91XlOpGfi+QrrHPuAABXqCGOePb0rnc2csNtHcGRCXOGUZyp9eeD06ioWqTznuh4ueM84qbaH4s0Wj6W9+AqMnHTdzirt1pepWL7lUsoJOcdas9m82caq0bA1tLCTvkGUz6qw5/CpctmyhoB6dctf6DLFbKDdGJwqsfven1yPqDXlF5EkUcLBDtOOD14Fe/vo9rcAyWw+zXIOQ6DjPlkV4r2sljuLyaSOPuw1xI23GPmflnNXTIQVS0CVuA3DHIxgU9s/dzhxgjPSp2EMFxuimPdtjcsmQMexz1/zmuc1u9vc9zuWTkbWXoc+dBU0w0tpYxcWjtwRuQjz9qPpbu+gz7sb4EZ0Yn4SFPFY3Tb+4skVtzAScJuPGOh/ejV/wBpIIdJuLa0cPNcFgNmRsUjnP4mhJEZcui//wDDmw3202qzDMkrlIieuB8R+p4+lbSsXZ9pbPRtCs7Szhe4mSEbj8KBzy3PU8k9BVRe0mp3+WacQp5JENo/HrVEyM4Sk2zf0qFdmHeTTnLs7Hvm+M5PlRfFMSaoj+NKpYpUaMJYpYqVKsCgdqsbbEmTqnB+X+CsTqXjaWWRSVDAnqON3Nb2/uO6Tu0SN3cfC+eB9KzV7blrWTfGFIDAoDnKnGce4Kg/LPpUJrys6sUvGjpaQJf2Ze1hRo1Xl3IVcnrQe40mwiOJ723Eo+7EGP5jj86r2niZYFCmTp3eM956EetXJdKmnY5sxGf5WZB+9LRVMpm2sYCDGXduuWiyPzaotKx4M3HkFTFSnsJrGTM0UiqfPGVP1HFVnuI1PxBT5ZFGxjqFCr4VIJ6k020Y5wK4rdwk/wCp+RpS3S4IiG4nzxxWUzSz/wAVis4o42QMm8lmB5B48qKx6hNDZC8tUDRnGHPSs7ZWneQz7izPlePXP/gV6TpumW8PZeC3fhVXLMBx86xxVjqVID6J2rdZEW/jmCuMqyReHHr61vV7q8t2UYeORccjrxWN0qwjt7o7MEdAR6e1bGywIwFrYsSaRi7XsqtlePdaiIxbI2VjIJDc+eBwP86UL7UR2kN/c2wVUDxq692u0ckhSAOBkCvSLzbJIIJMldu9gOuOa8n7QzNd6nNN0VtojXHwoBgCtSthaUTO7DXBiDcxIueHAP40TaI0Pso+81IyOPArc1WTpGR2wskUl1OYrjasIXCYT7oPHNX9KsLa3OVyzeprhHOdzq6E4Xwvu6e2PX3rpYSd1Mdx4PSudnQ9svXV6LVSSu0DpxVzst2vxqCWl5IrQPwkuMbD5ZHpVizgttUiMTjax43L1BofrGgf8xbw3Ew3ReFGUfd9KFXYrV6PUYZ42w3AO7HXNeM9qdPD6lqMSDxw3EhX5ZP7VptahuNHtty3k32aLuxCgyDKzLklmBz5dBjgH1rP2zvK3eTHdI7ZYnqavE5Z+LtGO7vBwRU1XDK3TBzxRbVLHuZWKjjNUAmK1jKVosa1DgQspJjZcrzxzQwJyKM3WJNOhTqYmKj5HBH60PEfiFaEHqgvHCslkoA5HSulpAy7ipGT1U+dT09cwAVdCd31HlkYoRKTNX2VjKaNGzDG93bj/qI/ai+KpaIY10yCJCMogBHv1P61fxTnM+xsUqfFKgwlUJ5UggkllbakalmPsK6YoT2qkMWiy4ON7IhPtuGaGMuyO2W8u0hiJSaUb3fAPcx/zY8z5AHz+VTl0WyRe/lklRIcspL/AAep9z7nJNE+zlukGkLKwCySjdI5PJI6ZPoBQO61SPV2mgtyDbLOqH/6nDMfp4R+dTb9lkvSMNqepSvdlNNRreI/CxHjcepPv7YrvpWnX9y209+4bncRnH1ozAglfvO6BOeuK0tkWVF2AD2qKmdcsaSAFx2f1S2tjJC5dAPEp6j6Vlntz3jiVdrjk8da9kj/AIkDKw+70rC3mlq+pEbSQ2Qx/wA9KdbJuomTEC+Q/CnEODXaIMh2yDA9etdtlNQtnODCMUBI3jr6elGNG1aEj7Ne34CoNilHbJB8mA4PzxQiXw5A+IjHy61atIoJGilaRopB8WzjmkkiuOS6Zo9PkSPUUt4ZlkVhlSDkYrXWcoVhk9Kyj6jpVpHHNdXCmVOVAPi/CuVr2ot5p871t7cEDfKcZycUq0bK5G7GJLhs9Cu2vJdSgEV/NGudqOVGfLHFbkdrtEguFSe+CR4OH7tir/Igf4aD67ptrNftfw3kC2N0onSXdnO7k8fn9apF12RkZZbZ5c7Fziqy6VdQBytvu3EksjZ/KtNbxRI/8F3lT17hj+Yq7mRQNkSNjrkYP4NU5TtjxdGISR48iYAf7vf0NdIGViOelbNrezu+Ly0Rj0yEKsPqMGg9/wBknTfcaJL38fU27kB1+R8/1+dZ2UjlXs7aHcrBMryOqrjGSahf6zdJrLfZLaK8DkAMzHhfT25/WgOml7q5+yuCoBIIPBUj19K0tlYS2cTyzR3SLGC3ekhoxjkZBHrihIo5JbOvbDU/t0NhYmMRyoommQEHBxhR+BJ+tAQ2yT2BqtdXLTahLdlcGRyxA9KhqV2LWMMPFI/wjy+dXXRxyVsta5cW6RJuYGVh8IPPzrPC4jJ8Ywv+0k1UmkaZy8hYljk/OoDaDyOPbrWseMFFBWCVZAIpCpB6HO09OOtOIwJlicFHJwu7o31qnBA2SVIkjIyylvL5UY0rTZHdREXVGGDG/INZ0a9FiyzE2GBBq7cS7Yg20Hbz86t3ujXNpCssoDKB8aj9aqfZu+sLtsncqAr6cMM1qIPsNaNdKl+FVj3bQxSAHy4wfyP5Vqq8+02QG+h3NtBt8E5xjwVvbWX7RbpNjG8ZA9vL8qZEpqmdKVPilWkyVC+0trJd6RLHEAXBDDJA6H3otigOq3hmuDBF/pQqXckcMR0/OsY8eyOoX09r2QtYAStxOoiY55A+9+VCez1uYryONhsBYMAeM4yOM89GNW5Y5Jl09IwWIVup+83P04U1GCOaz1SIuYvEwztHPXzJ5/OpvotHsADXYLO6IUvsDEHI4opNrdxYxJdmDfBMPAw459KEmxjl71NneZfOPVif1raWFtZT9npIJ9s6QAhgvJGBzgfSo0vR3f0bs12n+0yGG/gEDMQFPIBz79KKanp7pdI0KAh29cYqhpkIgg7uIq8B8QdfStJN/wAxp7LGxDlMIy9VPkRTJkZRTezy7WNO+xX8kG8uAT4ioGfwP1+oqpHnHi6j3o52mWR9S2SlWmjjVZXAxufzP6UMgtZGZmGAijLOx4FOutk5VdI4/Y2l2vHgszbQv96u3+gtp1ms11dwrM+Ntup3MQfPNEP+Grpmn3WoR3vfgr4IwmQSemOc+VW7Z3u9Huby/CFGjOF2lcemM85ziiw46sw+owAIk7DgZDfrQCRpbtuBwOB7US1q4725Fup8EY8WDwT/AGohoNjHvmecYjt/j92zgL+v4VtVsflUS32b0g2kJutRxIsmO4tX5U/72H6CtLFpzzv300gMjdO8HI/pXDTxvH2ubJkc4jHoPWuGs68ulxb2G9m4RfMn+1c8puUqRqje2aGLSLrCtHMj8ev965TRXNs224hz7rwawVj2+1u3lBkNvNHuBZGjwcegII/PNep2V9ba9o6TISoYfEPijb1/zrQ4uPYOAIUCRNyHgdeP1FTiYoN6oWXzC0BHaFbPVJ9P1iPubmB9hlQeFh5N8iMGj0TRS7ZYGXnoQfC9bVCNHDV9IstStmvIz3dwg4nUcj/qHn+tZl9QvoNPn026XBJCuc5BA54+eB9K2c3ETFFPiOHHmRjBHz86AXVumo6bJIv/APLssq/qyA4/L+tPF7Mt1Rjbq4S3zuDM2OgHT50IuJ5Lh90jE4GAPICi2srHEgUL/EkJb29z7nyoRtqw8VogAT0BNIEenNXLGIS7wvL/AHRuxmoyR5VGZhuI5GOnzpb2Uoey4mUkcVu9Gi75FZBzxjistp1o0wAhIJovo8d8bu4hIlH2VO8k2sPCMdRzz+9I7k9GSSStnollCLq1e2nHEiFDn3rGRbonuLGQDciOgPr1/etBoesMsDfbXLGKUxhwvLUCvvDq5kHQyZ+eaeLObIqBtpGFmZvJYV/NQP3rbaLdm7tF3rhkAU46GsjMphkdFHLMoPyAFaTs+wSPH8/SnRKf2G6VKnpiZC4fZGcHk8VnDAzvJFEcvM3ic+Sj/wA0Y1abuk54HlzVG3fETFeD95j6+n0pWPE7wlFu9xXKRRnzxk/41BLqVpZ3kxwM9PKi0BMhZUXpx4veuctvHDGzLhRnqf71htma1ZDbzCST+Ekrb8+nAP60P0dI45A6RSyLH4kIUnHqfwonr8sN7EbeBmlubKQGUFeOfT1wasaRbuF3b9jEfd/T/PSp1R2LJ47C/Za6hlFzDbyZiC7lQ9UPmK1jkLYyorfxAhK465AyMfWsDck2F4s0chDyAq23rii+nah5uxOfWtjCyWTLx6AVylwJmN1HKsr+I94pBOfOhOrXqWaqANzkfDnr8/8APOtrrOqadcGO0kXdJ5zDpD/X3Feedqo+71aWDcGEWAGHmMA/vTSiLilbK0Osag6/ZzfMsQbckbY2Z9D/AJ+FaXVO1MVx2OigtYxBdidI5E6gAKx3D8BWNWMtGSATtPPHlVkH7VCkZVQ0S4DDq3PH9KKLNIpoNwII5bo3v/etVagyWVjarwbjEspx6jr+A/Os1DC0siRbTiRgo9smt1YwgSvMBxjanso4H6VPK6Rq2yxLIEG1fhQbQB+lA9a0/wD4jfQQucmGLc5Hq2M/oKLPy6+hbJ+VB7PW7Q38lzIcd4TgMPLy/LFQgndlSpd6IsMLMi9PatH2Autlrc2+fH3e9VI6lSc/kRUbvVrO2Q98jbZlDJhc5BFU+xV0j9oTHGpWN1fHPqP/ABTvaBvVF/tzYQzLZa0f9GWP7LdN/L5o/wBCMfUVnbK7u+z86ByWs5OnoOa9DtLeO/stQ0i55ikBA88A+Y+RwfpQLVtMEulzWcyf8wgx5dR1PyqmLyjRz5ZcJBbTr+G9t1eNwyEcEHOKkLYW+o/aQMLKpSZeokBGM/OvOtFvbzSrto1BbYfHFn4h6ivQINUttR0ySa1bcUXxRnhl+lK1TMa+jH9puz940s13BsmtIc52N4lAPJx5jz46VlmXj3PNb3Qr2Lue5kZmDLgkeWRj/wA0AvOz8i25ks3M5hBWZCuGXB5I9RVl0EZ+mZ8ZU5U4IrqGaQln5NdxbgovBOehx1+X9K4FGQ5HI88eXz9KGWTLVjcPbTBkJHNehW+oWD6Ut7dRxC4UbFcryT5CvOYirYJH1rS6bdxG3ME8LzRdSFTP1NSfY0qa2aRUQaMku0NKJCFkV+gYhtwI6/Dj6mqWoJm4Vh54NTt7ewtoUXSWb7NLiRl3kjdk+XlXa6jzIn/TVYrWziyNOYNvE3Xbn06UT0ubxKpO1gMD3qpMmZnPvTxxncMHGTgEtitsVq1RrBNwMjmlQRbe7KgjvSMcYP8AenpuSF4SJXMct5MC6lQv3mNdBCqLjkKPLPJoxPCGbeVz5VTmjA5IG33rKCypE2JCg4yvwjgCuNy6wwz7xtjwXZ93QefFXYbXMbEA5P4/U1k+19888jaRZ5Mjkd8R5AeX7mg1K2BL24m0ztHcTlVIny2PIo/9On0q3adoFifcsbMduNoHX+lS1N/tDQuRghCpGeniJ/eqsVv3j4GN2MjNYX01stfapbqczzLtLdF9BVt71oYtqHxMOKa0sAqKCxwBwTyTVuHTrYSFnVn92P7CglJoHQqWbJyTQPUwXvJmPkxH4cVvoILdMfwY/qoNYu+jBvLggADvG4HzrWNjlbKVosYZhMDsZCOCfixx096hbR/xADx71Y7sggjgjpU+5ZWV3UndyCT1pSz6O2n2p/4pwOgyB6E8f1rUqghib0xQzRrdmvO/KkIiDr5nmid8cjaPWufK7lQ0Ogbqb7bCYA4bujk/Pj9/yoNb2QSxZG7sxsRk4A+VWu0V0I4YYc+KV8sf9o6fn+lUhfdzZqisDIGzgjOeoojaWiyr2a+bSUvdK0/4RIi7UJoFpFt/w7tXZ5wv8XaccdRj967aXrk80EVrdSokaZwdvmORz5VQ168MV9Hcwnx+F0Pvmm30Co9HT/l9XiYH4mI+YNc+1Fs6mO7h2q3+m5K5x/Kfyx+FV7a8i1ayg1C2OM4fH8rDqPoeKKamY57S6jkIJ2bwPTHIpMb4yIZFyieddoNP7ox6jGxLpjvA3mD51VS9+zyNIjBJSmUfycH7retH9RkhSweORQSw445OaxluoknWCRj3YfqB0rpktksUrVMM6GwZhhfEecCt5pdrE5SQxJ3vUsPTy+fFZOwhtQQ0Mcix8dPX1960+mzGMEI42nJxjBrY6J5Nme7TaHFY34lsk/5acFmhwAqv5gen96zl/Zo0e9QykcEMMEfXzH+ZrX9pJ3muI0i8QjzuDHHPH9KGww9+pIAJHxIwwRWtDRm0tmXsrG5leQwxCQx8shOCRnHHr5Vo9HsY5wGAuLa5jOV8OCDVuGJoipTBUMMqf0/t+lGwofDA5B5BpXGxnmfogyFpdzEnJySfM00gywJ8jVkLxUGTOKYgVRESc4681wv7mCC2bcEkRuPAokxnoPTrRiOLw45rNa9HDbosQQfaAxkADkhST19z74pZ2kVwpOWySXWoKiqjqFAwAEHApVVjGpd2uJPIeVKo0dh6Sar3FsZ/CoyTVnFc7iRoYGdG2txiuk8wGarcra25iQ5YjxH1rM6bYxxG91C7ZY42kOHf09BXfXLjdJzJjglyvVVHt6nOBQGe6lujGGysUQxFFnIUevufelKRi6L8txFcyjYjBRwv8M1MRBGHrXGyOZFHXnmrcylSXIxj4qBmTQ5xiuu9V+NgPmabTbSTUpGSzxIB8TdFHzNarTuz1nZ4klUXE3XLjwj5CtEoE6bp9xe4eJNsXUSPwD8vWshqNsYr+5iPVJnX8DXrZOep+lefdpbcLrV1gdXDfiorGNDTM2Ic5458qmkGdxYkED8TVzufQVZgspJV7xhsjH3j+1Y3RW7CVpEIbGJTgNt5+dV5yoyX4VRk+1PaTCaLGPgbaararIiKLfPiflj6CuWtl0Y7WLiS61B5n4GcIP5VHQVzsh4yzqzqMcA0Tv8ATWcb0GflQyNntpSNp3Kehq6aaoOgq2yW1kKW00TKD42fPShFzI0oRXJO0Y5q81/NLEY8E59DVLunaTABzWxVGXYY7K6rNp90YQc28o8cZ6ZHmPQ1tNSEixpqkVw0kEqCPu1HA8J8R/D8awdtB9mlVpB4hXovZN+8sJLeXxRrNkY5A46fnUpVys1rRi7/ADIMZdj0A3VC10mJ+ZhMzDlkjwB+fWt7qfZpQxn0tUCn4kAw309vbigP2cwyqrIB68c1XlZzu4qgWY57NO8t5c4+KNxgEemOlHdNnW8t4ri3BBY7WTPIb0qlNEpBOaJ9k9OuLGa5uL2Fo7NF71WfoSBxgfLNMjH0DryKZLm5M0bLIjElWGDg0L+0PbyDjIU8eoFeh6ff2faKBllgGQucZyVHnz5UE13stLHE8tlmZAMhceNf60wq+mDbO6SfxOysPXHI+dEQxi8Q8Q9BWRRpLeXfGSpHUUYt9RLxkr5clT1H9q2xZQp6NLGqywiWJgyHz8x7EU3d8UEs9WWxvYy+fstw2yT/AGN5N+x/tWkaPa2BQK1RyTCIzHyGaxFvb3GratNK74ZhuA+nArRT3xvLufT4F2qPA0oOc+ox+XWr+jaGbOUzOQyngECklbLY2oJv2dIdHxEgIXIUZ5pUapU3FE/ySHoT2ijeS0UmVkt0JaYIcM/HAz6ZoseBk0M1ZWurYwrwrMAT7edaKjKw6K9zYmYbUDtkL0yBVWTR54+QUx861szJGgjUgKvAFDZ3LMFQZzWUbzYItdPkU7mbaQc8c1pNN0B7nbLesVj8lXgn6+lX9J0fugJrtRv6rGfL50aOcgZNBttnOCGG1hENvGsca9FWnLgVFmJPhqB3YPh6+9aZY7N6Vku0cRbUmfrvRT+1amQ4GOD9KAa6QbjPGQAv7/vWS6CPYNtrFEAklAc+S+VPdlpSdx2joFFdoW3RYPUVwlRiTmuV23s6kkilAht2l2eYzQ54GknLsxYscsWPJopKHDZT4h0quTcE+K1RvcPiih7OkcAUDA+hqlqukxXMXfRDEkfxZ8xXczXUfS0P0k/tTpqRBxNZyp5ZXxVqtO0YwPDZBfCqAsOeTwKu6Zpyoz3Mg3M3EY9PepxQkswBkZCdxwMNj5Yq0kl73m2NIkiHCqFzgVSb+hI9g++syXztNa7s3ttLBUlRxI7biAPLAA/SqtrE+QXUE+/FGI++CgqFz8qix7CMN6pwAGArjqNpFfoW4WQDwuBz9fWoxySAYZgP/ZXVZSeCetCbRjSZm4rdre82ypl1wR6ef9KJa/eSR6CY8kNMBH9Op/IY+tWryEOFlUDvEGD7igusyNcm3hA/015x/MT/AGFdMXaOZqpF/sVaC3spJ2XxTNgH2H981pt3FZmW/NpHBa2nCxABmH3j5/nRyCVnhRpE2OR4l9DTCt3sHa72bttVDTQhYLr+cdH/AOofv1rAXVndaZeFJkaKZPz9x6ivWEbPFVdU0221W3MNymcfC4+JD7UDxkeby2ZvrYm3AD53PFn81/pWifVFh0UMSTdRwqhBB+PGM/vVc6XLpkncXhXbuPczqeD7VSvnlugtuj9GyTihh26L3Za2ZQrAEvIepH51tSEWHaOFX86yWgXd1Yti8jVrYDHeqOU9yPStSW3ICMbTyCPOhCStMhT0+KVaKcpj5D61WmGIZD/tNWSMmosm5SOuRigDNMryN4QTn0o7oukrbAT3C5kIyoP3ff51Zs7OKMZCAY9fWrhNYMSZsGmPODTkDOfLFcjtU7icmg0dlBOTkj0rk0mAdtS3buBmoSBRgEmtMZyLA46is1fSCa8kIOVB2j9/89qO30ncQu+7oMJ86AIuSB6VLI/RTEt2SiG2oy5PGM13Aw2Kg6jrgZqRYrhADU+EGcZJ6D1qIwrYPrU8b3B9OBWmWVLqZoYjJMwUZwqRgFj9TVWO4LxrIikk9Oc4/ert3tdiPIetUptPJde5LKcYFUURHKyU9uyZurGNu/xjCrnJJ64+WR9aNW8asFZk2sQGII5GaERWl4sSY2llZsnPlxjy+dE9NZzD/GGHSQqwzng8g/rWTWjYv0E4kTy6+ldRED8PDfhXFB0PpXV2OzjrUqGskNwHNRMgB681wiujna586heIybZozlfP2NakFhBHDDnoaE3sOy6Q+gzn5VZtJwwxnmrn2dZ3R25xkY9aeDp0JNWrK+lWWHF1MvP3FP60bzuA9RVdEOAM/Wuy59OauRJoCDz18jU19SaYNnHrTANnnp60Ac721hvrdoZ1yp5B81PqKysmlNYzmOTxZOQ/8wrYDKg1xuYFuYir9fun0pWMnQJs7dZEMbrlGGGGcURghjt4lihXbGgwoznFNbw9yu0nLdSa7VqFbsalT0q0w54qSKM81ICoXUJntZYFcxmRCu8dVyOtAI6M6jjcPxphKucZHtWBXsBdxgZ1KJ8dS0cn/wCyuMnZG7iGYb21Ljp4Zl/MSZqfKX0X4Y/+j0RmwAM8Vz+M5H/isDp2u6loV6tprBle3+93rb2jXIG9X43pyAcjI46it2ZQU8J8OODTRlZOcHFnXO1S3FQ3q55PIFVZGY/C20/rVZ7hoFZmxwK0U4atKJZRCuMJyfnVSJOdxFRjLOSzcljk11kIVQo+tReyy0hRDcXf3pNz0qvrBaHQLx0Yq/dMQQcEcUM7JSu+kv3js5ErAFmJ9PWl9lEvHkEGGH5qZJWF2HXbx8zT92Wahfa0tDpKBGZd8yglTgkYNb1sxLk6LMrnvjjG3r+VKORmUPxnrxVbRGZtMtJJGLMYlyT58DrRIoADgcZqpF6dE4HIGQW/7c01ux+3Sx+UkfHzB4/U1KHIO0jryOa5SMIruKYdFYZ+XnQ+gj2FoTuQZ6+ddV58J6evpXGIbJXQ9KyOsarqOr3xsNGykQYqXB2l8dST1Cg+nX8Mxei0VyNJLtjlKbhnPTNd7eUDKvyrDHNY+TsPdiHvjqamXz/h8Z9c5yfxrhYXuqaNeCz1IGWMgncMt4R5qevHmDQNwv8AVmumjNtN4SSp5U0SsbjvEI6EVUjK3MAUsMkZVq5WrNDPhhjyIrRHsPRyqVxk5NdFkA4LDPlQ12I5HQ81DvWOOeRVk7RBqmFpH2rljyfSlHMSODmhO9nOGJ+RqjqupzWEQW3296QTub4UX+Y/oB5mhtLbNjBydI1e8FeTj51HvE6B1/GsDbdnNa1tPtF5cmJWyVE+53PvgEKvyxXf/wBA3n/zKL/7J/8AypVJ/RX8cF3I3DYfkHp51DqMig3Zjs9LobXDy3nfGUKAqoVAxnnqeeaNuOadO+yM0k9MjSp6VaKIUiQaj086hLMkUbO7BVUZJPQCsAaeTCkZ5x0oa3J5FD5e1mgsf/7W1x6iQVxPanQyfBqMDk8BUbcx+QFZyQ/Cf0ce18SSW1nIyqZEuAOR1Ughh8iM0T7OXBfs9YSMD4oVIDdelZm6vpte1RLeCN0EQO1GHKZ4LuPu8ZAU88npxWwhhW3gjhiGI41CgfKki7k2iuTxxqL7Ou/d92h2oPucRr5HxfOrkkndLuHxHpQ7YWYnPnTMlFexoxjLdAKdELuM+tTZcDFdYBtXcR8qQeyj2l40O9C+ULfpQrslGV06dMci4fHy8q0dxAtzDJE4yJFKn61krS+fQ9Ta1uIiUdRuVByccB0HmMcEDJGB15pXplYeUHFdmpVMUC7ZJvs7aMecw/Srh7S6Njw38RYnGwHLZ9Mdc0D1C7n1rUfs1vGyHaURWHijB+KRx904ztB55z0rXVUGOLUreki/oBb/AIPYjZkCFc/hRUYcYUjPp509tarbxCJfhRQoGPSu3dgjGKqlohJ27OCqytnb+dQuEyp34z6VcER/mb8a5yxAjPU0Civ5XTSJLhDhxbnJ9wKG9i7dFjvmAG6OQRA/7QoxV+7G7QL5PNYn/SqfYV+8g1JuubpsfgKk15HQn/qZokAOVPQis92igVRbynlo5xtPz4/etAOGAoN2sxHYJIegmT9aJLQuJ1NFXs7KX0e0fP3cD5eVGHQTJ3i/GvUDzFBuyq57O2RI6x0agfYR6ihLQTfkzvausibGPIHFOI1B5P5VxZe7mV1+A/lVsgEBh508dCSFHDGTy+P/AGmhpisrjWRbyXQybhQw7s5wI9yj8d1E1OeD0FZntXbzWd1Fq9ruKKAs+0ZKYOVfHnjkH2JpckW0UwTSl/T0q0trZsA3I/7SK4aPMdQW+N1aTWP2a6eCPvx/rKOki/7TWT0ztlYS2qSXEywE8bico3ybof1q5/6v0cddTg/7q219hTWuJpZYoB8M4/7TVd0j/wD9R/20OsNYstSLixuoptmCwVskZ6VaJp1/SUnWmie0fz/lSrnSoEtfRyfiq11Es8LxSDKOpVh6g0qVaZ0Z1OxunJjZPfr8ruT+tTXsnYg83OoMPNWu5CD8xmnpUvFfRX8uSuwnY6daadAIbG3SGMfdQYqwcKuW6UqVN0T7eylITIxboPKkqADNKlSj2R2ljXZxgKB0FNSooLJqK4ajptpqMPdXtukyZyAw6fKmpUUZdApey1iGJM17s/l+0vjHp16Va0ywtrGHu7WBIkB+FRSpUJIaU5S7Za2Yc+groEz0pUqYmyrqWo2emQiS9mEYY4UdSx9hXSCaG6gWa3cPGwyGFKlScvKivBLGpHS3iSQSwygMkikMD5ip6bptrpcbRWUQjRm3MMk5PrzT0q1oS30WHXByK5XtnBf2xguk7yJsEjOORSpUUCZwhs4rO3S3t0CRIMKo8qdkxhvSlSoo2zugDoUPnXSDJUoeopUqKMHK8UtuQQecimpUwoKuOymkzStMIZLeR+Wa3kaPd88GuH/pHTx0uL/63T/1pUqzihllmtJhbRNHtdKaR7ZpWaQAMZZC5wPn0osW4pUqEqFcnJ2xt59qVKlWmH//2Q=='
                  alt={movie.title}
                  className="w-full transform group-hover:scale-105 transition-transform duration-500"
                />
                <Button
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/90 hover:bg-primary"
                  onClick={() => setShowTrailer(true)}
                >
                  Watch Trailer
                </Button>
              </div>
            </Card>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-3">
                {movie.genre.map((genre) => (
                  <Badge 
                    key={genre} 
                    variant="secondary"
                    className="bg-primary/10 dark:bg-dark-primary/10 text-primary dark:text-dark-primary hover:bg-primary/20 transition-colors"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Movie Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-background-secondary dark:bg-dark-background-secondary rounded-lg">
                <Tooltip content="Duration">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{movie.duration}</span>
                  </div>
                </Tooltip>
                <Tooltip content="Rating">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>{movie.score}/5</span>
                  </div>
                </Tooltip>
                <Tooltip content="Total Reviews">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    <span>{movie.totalReviews.toLocaleString()}</span>
                  </div>
                </Tooltip>
                <Tooltip content="Age Rating">
                  <div className="flex items-center gap-2">
                    <Film className="w-5 h-5 text-primary" />
                    <span>{movie.rating}</span>
                  </div>
                </Tooltip>
              </div>

              <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {movie.synopsis}
              </p>

              {/* Cast & Crew */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Cast & Crew</h2>
                <div className="flex flex-wrap gap-3">
                  {movie.cast.map((actor) => (
                    <Badge 
                      key={actor} 
                      variant="outline"
                      className="px-4 py-2 hover:bg-background-secondary transition-colors cursor-pointer"
                    >
                      {actor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Show Times Section */}
            <Card className="bg-background-secondary dark:bg-dark-background-secondary">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Select Show Time</h2>
                
                {/* Date Selection */}
                <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                  {Object.keys(showTimes).map((date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? "default" : "outline"}
                      className={`flex-shrink-0 transition-all duration-300 ${
                        selectedDate === date 
                          ? "bg-primary dark:bg-dark-primary scale-105" 
                          : "hover:bg-primary/20"
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </Button>
                  ))}
                </div>

                {/* Show Times Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {showTimes[selectedDate].map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      className={`transition-all duration-300 ${
                        selectedTime === time 
                          ? "bg-primary text-background scale-105" 
                          : "hover:bg-primary/20"
                      }`}
                      onClick={() => handleTimeSelection(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Confirmation Alert */}
            {selectedTime && (
              <Alert className="mt-4 bg-green-500/10 border-green-500 text-green-500">
                <AlertDescription>
                  Selected show time: {selectedTime} on {new Date(selectedDate).toLocaleDateString()}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;