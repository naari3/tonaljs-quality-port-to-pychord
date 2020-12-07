import { ChordType, Interval } from "@tonaljs/tonal";

const chords = ChordType.all().flatMap((ct) =>
  ct.aliases.map((al) => {
    return [al, ct.intervals];
  })
);

const sortFunc = (a: any, b: any) => {
  if (a[1].length > b[1].length) {
    return 1;
  }
  if (a[1].length < b[1].length) {
    return -1;
  }
  return 0;
};

const chordMap: { [k: string]: string[] } = Object.fromEntries(
  chords.sort(sortFunc)
);

const chordTuples = Object.entries(chordMap)
  .sort(sortFunc)
  .map((d) => {
    const chromas = d[1].map((n) => Interval.semitones(n));

    return `('${d[0]}', (${chromas.join(", ")}))`;
  });

console.log(`(${chordTuples.join(", ")})`);
