import { useState } from "react";
import { Form, Input, Button, Space, Card } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getAuth } from "firebase/auth";

const FormComponent = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const payload = {
      userId: auth.currentUser.uid,
      playlistTitle: values.playlistTitle,
      songs: values.songs
    };

    const response = await fetch(
      "https://cs35lfinalproject.onrender.com/api/playlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      console.error("Error creating playlist");
    }
  };

  return (
    <Card title="Create New Playlist" style={{ maxWidth: 600, margin: "auto" }}>
      <Form
        form={form}
        name="playlistForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* Playlist Title */}
        <Form.Item
          label="Playlist Title"
          name="playlistTitle"
          rules={[{ required: true, message: "Please enter a playlist title" }]}
        >
          <Input placeholder="My Favorite Songs" />
        </Form.Item>

        {/* Songs List */}
        <Form.List
          name="songs"
          rules={[
            {
              validator: async (_, songs) => {
                if (!songs || songs.length < 1) {
                  return Promise.reject(
                    new Error("You must add at least one song")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={key}
                  style={{ marginBottom: 16, background: "#fafafa" }}
                >
                  <Space
                    orientation="vertical"
                    style={{ width: "100%" }}
                  >
                    <Form.Item
                      {...restField}
                      label="Song Title"
                      name={[name, "title"]}
                      rules={[
                        { required: true, message: "Song title is required" },
                      ]}
                    >
                      <Input placeholder="e.g. Blinding Lights" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Artist"
                      name={[name, "artist"]}
                      rules={[
                        { required: true, message: "Artist is required" },
                      ]}
                    >
                      <Input placeholder="e.g. The Weeknd" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Album (optional)"
                      name={[name, "album"]}
                    >
                      <Input placeholder="e.g. After Hours" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Release Date (optional)"
                      name={[name, "releaseDate"]}
                    >
                      <Input placeholder="YYYY-MM-DD" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Link (optional)"
                      name={[name, "link"]}
                    >
                      <Input placeholder="https://example.com/song" />
                    </Form.Item>

                    {fields.length > 1 && (
                      <Button
                        onClick={() => remove(name)}
                        danger
                        icon={<MinusCircleOutlined />}
                      >
                        Remove Song
                      </Button>
                    )}
                  </Space>
                </Card>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Another Song
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Playlist
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FormComponent;