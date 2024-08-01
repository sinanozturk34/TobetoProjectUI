export default interface GetAllClassroomGroupCourses {
    id: number,
    classroomGroupName: string,
    courseName: string
    imagePath:string
}

export const defaultGetAllClassroomGroupCourses: GetAllClassroomGroupCourses = {
    id: 0,
    classroomGroupName: "string",
    courseName: "string",
    imagePath:""
}