let users = [
  {
    id: 1,
    name: "Ahmed",
    email: "ama49912@gmail.com",
  },
];

export async function GET() {
  return Response.json(users);
}

export async function POST(req) {
  const NewUser = await req.json();
  users.push({ ...NewUser, id: users.length + 1 });
  return Response.json(NewUser);
}

export async function DELETE(req) {
  const { id } = await req.json();
  users = users.filter((user) => user.id !== id);
  return Response.json({ message: "deleted" });
}

export async function PUT(req) {
    const { id, ...usersUpdate } = await req.json();
  
    users = users.map((user) =>
      user.id === id ? { ...user, ...usersUpdate } : user
    );
  
    return Response.json({ message: "User updated successfully" });
  }