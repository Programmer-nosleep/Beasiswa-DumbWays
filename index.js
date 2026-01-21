var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var students = [
    { name: "Andi", score: 85 },
    { name: "Budi", score: 72 },
    { name: "Cici", score: 90 },
    { name: "Doni", score: 60 },
    { name: "Eka", score: 75 },
];
function getGrade(score) {
    if (score >= 85)
        return "A";
    if (score >= 70)
        return "B";
    if (score >= 60)
        return "C";
    return "D";
}
function averageScore(list) {
    if (list.length === 0)
        return 0;
    var total = list.reduce(function (sum, student) { return sum + student.score; }, 0);
    return total / list.length;
}
function computeResults(list) {
    var studentsWithGrade = list.map(function (student) { return (__assign(__assign({}, student), { grade: getGrade(student.score) })); });
    var leaderboard = __spreadArray([], studentsWithGrade, true).sort(function (a, b) { return b.score - a.score; });
    var avg = averageScore(studentsWithGrade);
    var aboveAverage = leaderboard.filter(function (s) { return s.score > avg; });
    return { leaderboard: leaderboard, avg: avg, aboveAverage: aboveAverage };
}
function render(results) {
    var tbody = document.getElementById("leaderboard-body");
    if (!tbody)
        return;
    tbody.textContent = "";
    results.leaderboard.forEach(function (student, index) {
        var row = document.createElement("tr");
        var rankCell = document.createElement("td");
        rankCell.textContent = String(index + 1);
        var nameCell = document.createElement("td");
        nameCell.textContent = student.name;
        var scoreCell = document.createElement("td");
        scoreCell.textContent = String(student.score);
        var gradeCell = document.createElement("td");
        var badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = student.grade;
        gradeCell.appendChild(badge);
        row.append(rankCell, nameCell, scoreCell, gradeCell);
        tbody.appendChild(row);
    });
    var avgEl = document.getElementById("avg");
    if (avgEl)
        avgEl.textContent = results.avg.toFixed(1);
    var aboveEl = document.getElementById("above");
    if (aboveEl) {
        aboveEl.textContent = results.aboveAverage.map(function (s) { return s.name; }).join(", ") || "-";
    }
}
var results = computeResults(students);
if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () { return render(results); });
    }
    else {
        render(results);
    }
}
else {
    console.log("DumbWays Leaderboard");
    results.leaderboard.forEach(function (student, index) {
        console.log("".concat(index + 1, ". ").concat(student.name, " - ").concat(student.score, " (").concat(student.grade, ")"));
    });
    console.log("");
    console.log("Nilai rata-rata: ".concat(results.avg.toFixed(1)));
    console.log("Siswa di atas rata-rata: ".concat(results.aboveAverage.map(function (s) { return s.name; }).join(", ") || "-"));
}
