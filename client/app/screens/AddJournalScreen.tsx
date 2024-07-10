import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, BackHandler } from 'react-native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../context/types';
import { useJournalContext } from '../context/JournalContext';
import { Toast } from 'toastify-react-native';

interface AddJournalScreenProps {
  route: RouteProp<RootStackParamList, 'AddJournal'>;
}

const AddJournalScreen: React.FC<AddJournalScreenProps> = ({ route }) => 
{
  const { createJournal, updateJournal } = useJournalContext();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const journal = route.params?.journal;  
  const [isUpdate, setIsUpdate] = useState<boolean>(()=> journal ? true : false);

  const [test, setTest] = useState(false);

  const [initialValues, setInitialValues ] = useState({
    title: '',
    content: '',
    category: 'Personal',
  });



  useEffect(() => {
    if (journal) {
      setInitialValues({
        title: journal.title,
        content: journal.content,
        category: journal.category,
      });
      setIsUpdate(true);
      setTest(true);
    } else {
      setInitialValues({
        title: '',
        content: '',
        category: 'Personal',
      });
      setTest(false);
      setIsUpdate(false);
    }



  }, [journal]);



  const handleSubmit = (values: any) => {
    if (values.title.length < 4 || values.title.length > 35) {
      Toast.error('Title should be at least 4 and at most 35 characters long.', 'top');
      return;
    }
    if (values.content.length < 10) {
      Toast.error('Content should be at least 10 characters long.', 'top');
      return;
    }

    if (isUpdate && journal) {
      const id = parseInt(journal.id);
      updateJournal(id, { ...values });
      setInitialValues({
        title: '',
        content: '',
        category: 'Personal',
      });
      setTest(false);
      setIsUpdate(false);

    } else {
      createJournal(values);

    }
    
  };
    


  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 16, paddingBottom: 32 }}
    // >
    <View className='flex-1'>
      <TouchableOpacity
        onPress={() => {navigation.goBack(), setIsUpdate(false), setInitialValues({title: '', content: '',category: 'Personal', })} }
        style={{ position: 'absolute', top: 16, left: 16 }}
      >
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
          {isUpdate ? 'Update Journal' : 'Add Journal'}
        </Text>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={{ backgroundColor: '#fff', padding: 24, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}>
              <TextInput
                style={{ borderColor: touched.title && errors.title ? 'red' : '#ccc', borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 8 }}
                placeholder="Title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              {touched.title && errors.title && (
                <Text style={{ color: 'red', marginBottom: 8 }}>{errors.title}</Text>
              )}

              <TextInput
                style={{ borderColor: touched.content && errors.content ? 'red' : '#ccc', borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 8, textAlignVertical: 'top' }}
                placeholder="Content"
                onChangeText={handleChange('content')}
                onBlur={handleBlur('content')}
                value={values.content}
                multiline
                numberOfLines={8}
              />
              {touched.content && errors.content && (
                <Text style={{ color: 'red', marginBottom: 8 }}>{errors.content}</Text>
              )}

              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: '#666', marginBottom: 8 }}>Category</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {['Personal', 'Work', 'Travel', 'Other'].map((category) => (
                    <TouchableOpacity
                      key={category}
                      onPress={() => handleChange('category')(category)}
                      style={{
                        padding: 8,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: values.category === category ? '#026D87' : '#ccc',
                        backgroundColor: values.category === category ? '#026D87' : '#fff',
                      }}
                    >
                      <Text style={{ textAlign: 'center', color: values.category === category ? '#fff' : '#000' }}>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity onPress={() => handleSubmit()} style={{ backgroundColor: '#009FC6', padding: 16, borderRadius: 12 }}>
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>{isUpdate ? 'Update' : 'Submit'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      </View>
  );
};

export default AddJournalScreen;
