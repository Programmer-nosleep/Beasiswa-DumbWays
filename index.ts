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

function computeResults(list: Student[]) {
  const studentsWithGrade: StudentWithGrade[] = list.map((student) => ({
    ...student,
    grade: getGrade(student.score),
  }));

  const leaderboard = [...studentsWithGrade].sort((a, b) => b.score - a.score);
  const avg = averageScore(studentsWithGrade);
  const aboveAverage = leaderboard.filter((s) => s.score > avg);
  return { leaderboard, avg, aboveAverage };
}

function render(results: ReturnType<typeof computeResults>) {
  const tbody = document.getElementById("leaderboard-body");
  if (!tbody) return;

  tbody.textContent = "";

  results.leaderboard.forEach((student, index) => {
    const row = document.createElement("tr");

    const rankCell = document.createElement("td");
    rankCell.textContent = String(index + 1);

    const nameCell = document.createElement("td");
    nameCell.textContent = student.name;

    const scoreCell = document.createElement("td");
    scoreCell.textContent = String(student.score);

    const gradeCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = student.grade;
    gradeCell.appendChild(badge);

    row.append(rankCell, nameCell, scoreCell, gradeCell);
    tbody.appendChild(row);
  });

  const avgEl = document.getElementById("avg");
  if (avgEl) avgEl.textContent = results.avg.toFixed(1);

  const aboveEl = document.getElementById("above");
  if (aboveEl) {
    aboveEl.textContent = results.aboveAverage.map((s) => s.name).join(", ") || "-";
  }
}

const results = computeResults(students);

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => render(results));
  } else {
    render(results);
  }
} else {
  console.log("DumbWays Leaderboard");
  results.leaderboard.forEach((student, index) => {
    console.log(`${index + 1}. ${student.name} - ${student.score} (${student.grade})`);
  });
  console.log("");
  console.log(`Nilai rata-rata: ${results.avg.toFixed(1)}`);
  console.log(
    `Siswa di atas rata-rata: ${
      results.aboveAverage.map((s) => s.name).join(", ") || "-"
    }`,
  );
}
