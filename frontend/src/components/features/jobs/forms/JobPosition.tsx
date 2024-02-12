// Hooks API
import { useState, useEffect } from "react";
// Material UI
import { 
  Box, 
  Button, 
  TextField, 
  FormControl, 
  MenuItem, 
  Typography 
} from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
// Hook Form
import { Controller, useForm } from "react-hook-form";

// 雇用形態マスターデータ
import { employmentSystems } from "data/employmentSystems"

// フォームの型定義
export interface JobPositionType {
  title: string;
  position: string;
  employmentSystem: number;
}

function JobPosition(props: any) {

  const [employmentSystem, setEmploymentSystem] = useState<number>()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobPositionType>({
    defaultValues: {
      title: "",
      position: "",
      employmentSystem: 0,
    },
    mode: "all",
  });

  const onSubmit = (data: JobPositionType) => {
    console.log(data);
    props.handleNext();
    props.setFormValue({ ...props.formValue, JobPositionForm: data });

  };

  useEffect(() => {
    if (props.formValue.JobPositionForm) {
      setValue("title", props.formValue.JobPositionForm.title, {
        shouldDirty: true,
      });
      setValue("position", props.formValue.JobPositionForm.position, {
        shouldDirty: true,
      });
      setValue("employmentSystem", props.formValue.JobPositionForm.employmentSystem, {
        shouldDirty: true,
      });
    }
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        1. 募集ポジションを入力
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography gutterBottom >
          募集タイトルを入力してください
        </Typography>

        <Box mb={3}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                placeholder="例) フロントエンドエンジニア(React/Next.js)を募集"
                error={errors.title ? true : false}
                helperText={errors.title?.message}
                fullWidth
              ></TextField>
            )}
          />
        </Box>

        <Typography gutterBottom >
          募集ポジションを入力してください
        </Typography>

        <Box mb={3}>
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                placeholder="例) バックエンドエンジニア"
                error={errors.position ? true : false}
                helperText={errors.position?.message}
                fullWidth
              ></TextField>
            )}
          />
        </Box>

        <Typography gutterBottom >
          雇用形態を選択してください
        </Typography>

        <Box mb={3}>
          <Controller
            name="employmentSystem"
            control={control}
            render={({ field, formState: { errors } }) => (
              <FormControl
                variant="outlined"
                margin="dense"
                fullWidth
              >
              <InputLabel id="demo-simple-select-outlined-label">雇用形態</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={employmentSystem}
                label="雇用形態"
                onChange={(e) => {
                  setEmploymentSystem(e.target.value as number);
                  field.onChange(e);
                }}
              >
                {
                  employmentSystems.map((employmentSystem) => (
                    <MenuItem key={employmentSystem} value={employmentSystem}>{employmentSystem}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            )}
          /> 
        </Box>

        <Box sx={{ display: "flex", justifyContent: 'flex-end', pt: 2 }}>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            次へ
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default JobPosition;
