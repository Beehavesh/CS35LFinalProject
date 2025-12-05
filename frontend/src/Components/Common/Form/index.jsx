import { useEffect, useState } from "react";
import { Form, Input, Button, Space, Card } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const FormComponent = ({ form }) => {
  const availableGenreTags = [
    "Rock", "Pop", "Hip-Hop", "R&B",
    "Jazz", "Country", "EDM", "Classical"
  ];

  const [selectedGenres, setSelectedGenres] = useState([]);

  // sync selectedGenres to the form, only when selectedGenres changes
  useEffect(() => {
    form.setFieldsValue({ genreTags: selectedGenres });
  }, [selectedGenres, form]);

  return (
    <Card title="Create New Playlist" style={{ maxWidth: 800, margin: "auto" }}>
      <Form
        form={form}
        name="playlistForm"
        layout="vertical"
        autoComplete="off"
      >
        {/* Playlist Title */}
        <Form.Item
          label="Playlist Title"
          name="playlistTitle"
          rules={[{ required: true, message: "Please enter a playlist title" }]}
        >
          <Input />
        </Form.Item>

        {/* Songs List */}
        <Form.List
          name="songs"
          rules={[
            {
              validator: async (_, songs) => {
                if (!songs || songs.length < 1) {
                  return Promise.reject(new Error("You must add at least one song"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card key={key} style={{ marginBottom: 16, background: "#fafafa" }}>
                  <Space orientation="vertical" style={{ width: "100%" }}>
                    <Form.Item
                      {...restField}
                      label="Song Title"
                      name={[name, "title"]}
                      rules={[{ required: true, message: "Song title is required" }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Artist"
                      name={[name, "artist"]}
                      rules={[{ required: true, message: "Artist is required" }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item {...restField} label="Album (optional)" name={[name, "album"]}>
                      <Input />
                    </Form.Item>

                    <Form.Item {...restField} label="Release Date (optional)" name={[name, "releaseDate"]}>
                      <Input />
                    </Form.Item>

                    <Form.Item {...restField} label="Link (optional)" name={[name, "link"]}>
                      <Input />
                    </Form.Item>

                    {fields.length > 1 && (
                      <Button onClick={() => remove(name)} danger icon={<MinusCircleOutlined />}>
                        Remove Song
                      </Button>
                    )}
                  </Space>
                </Card>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Another Song
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* ======= MOVE TAG UI OUTSIDE Form.List ======= */}

        <Form.Item label="Playlist Genres">
          <div style={{ marginBottom: 8 }}>
            <strong>Available Tags:</strong>
          </div>

          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {availableGenreTags.map((genre) => (
              <li key={genre} style={{ marginBottom: 6 }}>
                {genre}{" "}
                {!selectedGenres.includes(genre) && (
                  <Button
                    size="small"
                    onClick={() => setSelectedGenres((prev) => [...prev, genre])}
                  >
                    Add
                  </Button>
                )}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 12, marginBottom: 8 }}>
            <strong>Selected Tags:</strong>
          </div>

          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {selectedGenres.length === 0 && <p>No genres selected yet.</p>}
            {selectedGenres.map((genre) => (
              <li key={genre} style={{ marginBottom: 6 }}>
                {genre}{" "}
                <Button
                  danger
                  size="small"
                  onClick={() =>
                    setSelectedGenres((prev) => prev.filter((g) => g !== genre))
                  }
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </Form.Item>

        {/* Hidden field so genreTags is a top-level form field */}
        <Form.Item name="genreTags" style={{ display: "none" }}>
          <Input />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FormComponent;
