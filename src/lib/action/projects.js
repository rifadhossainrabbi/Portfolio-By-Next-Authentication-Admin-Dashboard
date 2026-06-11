'use server';

const baseUrl = process.env.NEXT_PUBLIC_SERVER;
export const creatProjects = async (projectData) => {
  const res = await fetch(`${baseUrl}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  return res.json();
}