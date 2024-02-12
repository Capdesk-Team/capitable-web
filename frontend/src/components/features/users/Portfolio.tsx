import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type EditTodoFormProps = {
  id: number;
};

// Todo を編集するフォーム
const EditTodoForm = ({ id }: EditTodoFormProps) => {
  const router = useParams();

  // フォームの入力値を管理するstate
  const [title, setTitle] = useState('');

  // フォームの入力値を管理するstate
  const [content, setContent] = useState('');

  // idが変更されたら(=Todo編集ページを開いたら)、Todoを取得してフォームの初期値を設定する
  useEffect(() => {
    // idが存在しない場合は、処理を中断する
    const fetchTodo = async () => {
      try {
        // idを元にTodoを取得する
        const res = await axios.get(`http://localhost:3000/todos/${id}`);

        // フォームの初期値を設定する
        const { title, content } = res.data;
        setTitle(title);
        setContent(content);
      } catch (err) {
        console.log(err);
      }
    };

    // idが存在する場合は、Todoを取得する
    if (id) {
      fetchTodo();
    }
  }, [id]);

  // フォームの入力値を更新する関数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // APIを呼び出して、Todoを更新する
      await axios.put(`http://localhost:3000/todos/${id}`, { todo: { title, content } });

      // Todoの更新に成功したら、Todo詳細ページに遷移する
      router.push(`/todos/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <label className="block text-xl font-bold text-gray-700">Edit Todo</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="本文"
        />
        <button
          type="submit"
        >
          保存する
        </button>
      </form>
    </div>
  );
};

export default EditTodoForm;