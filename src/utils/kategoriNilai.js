export const handleSetCategory = (cat) => {
  let category;

  if(cat === "uh1") {
    category = 'Ulangan Harian 1'
  } else if(cat === "uh2") {
    category = 'Ulangan Harian 2'
  } else if(cat === "uts") {
    category = 'Ujian Tengah Semester'
  } else if(cat === "uas") {
    category = 'Ujian Akhir Semester'
  }

  return category;
}