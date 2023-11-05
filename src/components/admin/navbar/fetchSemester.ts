async function fetchSemester() {
  try {
    const response = await axios.get('/api/semesters?page=1&quantity=50')
    const json = response.data
    semesterOptions.value = (json as Array<SemesterModel>).map((item) => {
      item.startDate = item.startDate.toLocaleString().slice(0, 10)
      item.endDate = item.endDate.toLocaleString().slice(0, 10)
      item.createdAt = item.createdAt.toLocaleString().slice(0, 10)
      return item
    })
    console.log('API Department:')
    console.log(json)
  } catch (error) {
    console.log(error)
  }
}
