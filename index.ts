type Student = {
  name: string;
  score: number;
};

type StudentWithGrade = Student & {
  grade: "A" | "B" | "C" | "D";
};

const students: Student[] = [
  { name: "Andi", score: 85 },
  { name: "Budi", score: 72 },
  { name: "Cici", score: 90 },
  { name: "Doni", score: 60 },
  { name: "Eka", score: 75 },
];

function getGrade(score: number): StudentWithGrade["grade"] {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "D";
}

function averageScore(list: Student[]): number {
  if (list.length === 0) return 0;
  const total = list.reduce((sum, student) => sum + student.score, 0);
  return total / list.length;
}

const studentsWithGrade: StudentWithGrade[] = students.map((student) => ({
  ...student,
  grade: getGrade(student.score),
}));

// Case 1 — Urutkan skor tertinggi -> terendah
const leaderboard = [...studentsWithGrade].sort((a, b) => b.score - a.score);

// Case 2 — Hitung nilai rata-rata
const avg = averageScore(studentsWithGrade);

// Case 3 — Tampilkan siswa di atas rata-rata
const aboveAverage = leaderboard.filter((s) => s.score > avg);

// Case 4 (Bonus) — Tampilkan grade huruf
console.log("DumbWays Leaderboard");
leaderboard.forEach((student, index) => {
  console.log(`${index + 1}. ${student.name} - ${student.score} (${student.grade})`);
});
console.log("");
console.log(`Nilai rata-rata: ${avg.toFixed(1)}`);
console.log(
  `Siswa di atas rata-rata: ${aboveAverage.map((s) => s.name).join(", ") || "-"}`,
);
