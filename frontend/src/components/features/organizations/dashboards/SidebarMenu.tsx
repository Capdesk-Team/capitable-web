import React, { useState, useEffect,} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import EditIcon from '@material-ui/icons/Edit';
import BusinessIcon from '@material-ui/icons/Business';

// API
import { showOrganization } from 'api/organization'
// Interfaces
import { getOrganizationsList } from 'interfaces/organization'

const SidebarMenu: React.FC = () => {

  const { id } = useParams<{ id: string | undefined }>();
  const [organizationList, setOrganizationList] = useState<getOrganizationsList[]>([]);

  // id が undefined の場合は NaN を返す
  const orgId = id ? parseInt(id) : NaN;

  useEffect(() => {
    // isNaN() 関数を使用して orgId が NaN でないことを確認し、適切に処理する
    if (!isNaN(orgId)) {
        handleShowOrganization(orgId);
    } else {
      console.error('組織IDが無効です');
    }
  }, [orgId]);

  // 法人詳細情報を取得
  const handleShowOrganization = async (id: number) => {
    try {
      const res = await showOrganization(id);
      console.log(res.data);
      setOrganizationList([res.data]); // 配列に追加する
    } catch(e) {
      console.log(e);
    }
  }  

  return(
    <>
      {organizationList.map((organization: getOrganizationsList, index) => (
        <React.Fragment key={index}>
          <ListItemButton component={Link} to={`/organization/${organization.id}/users`}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="メンバー一覧" />
          </ListItemButton>
          <ListItemButton component={Link} to={`/organization/${organization.id}/jobs`}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="募集を管理" />
          </ListItemButton>
          {/* ユーザー招待 */}
          <ListItemButton component={Link} to={`/organizations/${organization.id}/profile`}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="法人情報を管理" />
          </ListItemButton>
        </React.Fragment>
      ))}
      
    </>
  )
}

  
export default SidebarMenu;