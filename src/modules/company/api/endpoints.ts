export const endpoints = {
  getCompany: (id: string) => `/companies/${id}`,
  postImage: (id: string) => `/companies/${id}/image`,
  deleteImage: (id: string, imageName: string) => `/companies/${id}/image/${imageName}`,
}