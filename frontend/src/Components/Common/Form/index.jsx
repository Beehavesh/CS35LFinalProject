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
    <Card title="Create New Playlist" 
      styles={{
        title: { color: 'white', backgroundColor: '#0E0E0E', fontFamily: 'Gudea', fontSize: 30},
        content: { color: 'white', fontFamily: 'serif', backgroundColor: '#0E0E0E', padding: 24},
        container: { color: 'black', backgroundColor: '#0E0E0E', borderRadius: 30, borderColor: 'purple'},
        header: { backgroundColor: '#0E0E0E', color: 'black', colorIcon: 'white' },
        body: { backgroundColor: '#0E0E0E', color: 'black', fontSize: 16 },
        footer: { display: 'flex', justifyContent: 'center' },
        
  }}>
      <Form
        form={form}
        name="playlistForm"
        layout="vertical"
        autoComplete="off"
      >
        {/* Playlist Title */}
        <Form.Item
        label={<span style={{ fontFamily: 'Gudea', color: "white", fontWeight: "bold" }}>Playlist Title</span>}
          color='white'
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
                <Card key={key} style={{ marginBottom: 16, background: "#0E0E0E" }}>
                  <Space orientation="vertical" style={{ width: "100%" }}>
                    <Form.Item
                      {...restField}
                      label={<span style={{ fontFamily: 'Gudea', color: "white", fontWeight: "bold" }}>Song Title</span>}
                      name={[name, "title"]}
                      rules={[{ required: true, message: "Song title is required" }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label={<span style={{ fontFamily: 'Gudea', color: "white", fontWeight: "bold" }}>Artist</span>}
                      name={[name, "artist"]}
                      rules={[{ required: true, message: "Artist is required" }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item {...restField} label={<span style={{ fontFamily: 'Gudea', color: "white"}}>Album</span>} name={[name, "album"]}>
                      <Input />
                    </Form.Item>

                    <Form.Item {...restField} label={<span style={{ fontFamily: 'Gudea', color: "white"}}>Release Date</span>} name={[name, "releaseDate"]}>
                      <Input />
                    </Form.Item>

                    <Form.Item {...restField} label={<span style={{ fontFamily: 'Gudea', color: "white"}}>Link</span>} name={[name, "link"]}>
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
<<<<<<< HEAD
                <Button data-testid="addSongButton" type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
=======
                <Button style={{color: 'white', backgroundColor: 'black'}} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
>>>>>>> 7d48536c73049944585e8257fa07d741aa76cc60
                  Add Another Song
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* ======= MOVE TAG UI OUTSIDE Form.List ======= */}

        <Form.Item label="Playlist Genres" style={{color: 'white'}}>
          <div style={{ fontFamily: 'Gudea', marginBottom: 8 }}>
            <strong style={{color: 'white'}}>Available Tags:</strong>
          </div>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '8px' }}>
            {availableGenreTags.map((genre) => (
              <div key={genre} style={{ color: 'white', marginBottom: 6 }}>
                {!selectedGenres.includes(genre) && (
                  <button
                    size="small"
                    onClick={() => setSelectedGenres((prev) => [...prev, genre])}
                  >
                    {genre}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div style={{ color: 'white', fontFamily: 'Gudea', marginTop: 12, marginBottom: 8 }}>
            <strong>Selected Tags:</strong>
          </div>

          <ul style={{ fontFamily: 'Gudea', listStyle: "none", paddingLeft: 0 }}>
            {selectedGenres.length === 0 && <p style={{color: 'white'}}>No genres selected yet.</p>}
            {selectedGenres.map((genre) => (
              <li key={genre} style={{ color: 'white', marginBottom: 6 }}>
                {genre}{" "}
                <MinusCircleOutlined
                  danger
                  size="large"
                  onClick={() =>
                    setSelectedGenres((prev) => prev.filter((g) => g !== genre))
                  }
                >
                </MinusCircleOutlined>
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
