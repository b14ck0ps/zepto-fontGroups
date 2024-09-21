# Zepto FontGroups

Zepto FontGroups is a web application that allows users to manage font files effortlessly. Users can upload TFF files, preview them in the browser, and organize fonts into groups. The application ensures a smooth single page and intuitive experience while maintaining essential validations.

## Features

- **Drag & Drop Upload**: Upload TFF files by dragging them into the designated upload box or by clicking to select files.
- **Font Preview**: View uploaded fonts in real-time using the FontFace API.
- **Group Management**: Create, update, and delete font groups. Each group must contain at least two fonts.
- **Simple Validations**: Only TFF files are accepted for upload.

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Icons, react-dropzone for drag-and-drop functionality.
- **Backend**: Core PHP, hosted on an Apache server.
- **Storage**: Fonts are stored in the `/uploads/fonts` directory, and font group information is maintained in a `groups.json` file.

## Getting Started

This project is fully containerized with Docker. To run the application, simply execute:

```bash
docker-compose up --build
```

## Development
If you wish to edit the frontend live, navigate to the ./frontend directory and run:

```bash
cd ./frontend
npm install

docker-compose down -v
docker-compose up --build
```
without this language server will not work.