import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
// Material UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// API
import { getOrganizationUsers } from 'api/organization'
// Interfaces
import { getOrganizationsList } from 'interfaces/organization'

// ユーザーのリストを表示する
const OrganizationUsersLists: React.FC = () => {

  const { id } = useParams<{ id: string | undefined }>();
  // id が undefined の場合は NaN を返す
  const orgId = id ? parseInt(id) : NaN;

  const [organizationUsers, setOrganizationUsers] = useState<getOrganizationsList[]>([]);

  useEffect(() => {
    // isNaN() 関数を使用して orgId が NaN でないことを確認し、適切に処理する
    if (!isNaN(orgId)) {
      handleOrganizationUsers(orgId);
    } else {
      console.error('組織IDが無効です');
    }
  }, [orgId]);

  // 組織に所属しているユーザー一覧を取得
  const handleOrganizationUsers = async (id: number) => {
    try {
      const res = await getOrganizationUsers(id);
      console.log(res.data)
      setOrganizationUsers(res.data);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>メンバー</TableCell>
            <TableCell>お名前</TableCell>
            <TableCell align="right">権限</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {organizationUsers.map((organizationUser: getOrganizationsList, index) => (
            <TableRow key={index}>
              <TableCell>プロフィール画像</TableCell>
              <TableCell>{organizationUser.name}</TableCell>
              <TableCell align="right">メンバー</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default OrganizationUsersLists