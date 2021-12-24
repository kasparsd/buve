---
title: Gaisa temperatūra, mitrums un kondensāts
---

# Kāpēc uz logiem kondensējas ūdens?

Gaisam atkarībā no tā 🌡 temperatūras ir atšķirīga spēja saturēt ūdens 💦 tvaiku. Silts ☀️ gaiss var saturēt daudz vairāk ūdens kā auksts ❄️ gaiss. Piemēram, 50m<sup>2</sup> dzīvoklī ar 2,5m griestu augstumu gaisā ir 1,2 litri 💧 ūdens, ja gaisa temperatūra ir 20 grādi ar 50% relatīvo mitrumu.

Telpas vietās, kur ir ❄️ aukstāks, šis mitrums vairs nespēj eksistēt tvaika veidā un pārvēršas par ūdens 💦 pilieniem, tāpēc ziemā pie logiem, palodzēm un citiem aukstuma tiltiem, veidojas ūdens. Temperatūru, pie kuras tas notiek, sauc par **rasas punktu**.

Tāpēc jau minētajā dzīvoklī uz visām virsmām, kas ir aukstāka par 9 grādiem, veidosies ūdens.

Šis koncepts ir īpaši svarīgs māju būvniecībā mūsu klimatiskajos apstākļos, tāpēc ēku iekšpusē jāuzstāda materiālus, kas neļauj siltajam un mitrajam iekštelpu gaisam nokļūt konstrukcijās un tur kondensēties uz virsmām, kas ir aukstākas. Tā kā logu stikli un rāmji ir aptuveni desmit reizes labāki siltuma vadītāji par sienām, tad svarīgi izvēlēties logus, kuru virsmas temperatūra neatdzisīs vairāk par rasas punkta temperatūru.

## Pie kādas temperatūras veidojas kondensāts?

Ja gaisa temperatūra telpā ir <input size="2" min="0" max="50" type="number" v-model="ex1_tempAir" /> grādi un relatīvais mitrums <input size="3" min="0" max="100" type="number" v-model="ex1_rAir" />%, tad **uz virsmām, kuru temperatūra ir {{ ex1_tempSurface }} grādi, kondensēsies ūdens.**

<TempChart :chartdata="ex1_chartdata" />

## Pie kāda relatīvā mitruma veidojas kondensāts?

Ja gaisa temperatūra telpā ir <input min="0" max="50" size="2" type="number" v-model="ex2_tempAir" /> grādi un **relatīvais mitrums {{ ex2_rAir }}%**, tad uz virsmām, kuru temperatūra ir <input size="2" min="0" max="50" type="number" v-model="ex2_tempSurface" /> grādi, veidosies kondensāts.


## Kā mazināt kondensāta veidošanos?

Lai samazinātu ūdens kondensāta veidošanos:

- ir jāsamazina temperatūras starpība starp jebkuru telpas virsmu un gaisu,
- ir jāsamazina relatīvais mitrums telpā, aizvadot to ar nosūcēju vai vēdināšanu.


<script>
import { airHumidityAt, airTemperatureAt, surfaceTemperatureAt, roundTo } from './rasas-punkts'

export default {
    data: () => ({
        ex1_tempAir: 20,
        ex1_rAir: 50,
        ex2_tempAir: 20,
        ex2_tempSurface: 9,
    }),
    methods: {
        range: (size, startAt = 0) => [...Array(size).keys()].map(i => i + startAt)
    },
    computed: {
        ex1_chartdata () {
            return {
                datasets: [
                    {
                        label: `Data One ${ this.ex1_tempAir }`,
                        borderColor: '#f87979',
                        fill: false,
                        data: this.range(5)
                    }
                ]
            };
            
            return [ 1, 3, 8, 9, 12, 11, 8 ];
        },
        ex1_tempSurface () {
            return roundTo(surfaceTemperatureAt(this.ex1_tempAir, this.ex1_rAir / 100), 1)
        },
        ex2_rAir () {
            return roundTo(airHumidityAt(this.ex2_tempAir, this.ex2_tempSurface) * 100)
        }
    },
    watch: {
        ex2_tempAir () {
            return roundTo(airTemperatureAt(this.ex2_tempSurface, this.ex2_rAir / 100))
        },
        ex2_tempSurface () {
            return roundTo(surfaceTemperatureAt(this.ex2_tempAir, this.ex2_rAir / 100))
        }
    }
}
</script>