
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Phone,
  MessageSquare,
  Award,
  UserCheck,
  BarChart3
} from "lucide-react";

export default function EducationCRM() {
  const [activeTab, setActiveTab] = useState('students');

  const students = [
    { id: 1, name: 'Alice Johnson', course: 'Computer Science', grade: 'A', attendance: 95, phone: '+1234567890' },
    { id: 2, name: 'Bob Wilson', course: 'Mathematics', grade: 'B+', attendance: 88, phone: '+1234567891' },
    { id: 3, name: 'Carol Brown', course: 'Physics', grade: 'A-', attendance: 92, phone: '+1234567892' },
  ];

  const courses = [
    { id: 1, name: 'Computer Science 101', students: 45, instructor: 'Dr. Smith', progress: 75 },
    { id: 2, name: 'Advanced Mathematics', students: 32, instructor: 'Prof. Johnson', progress: 60 },
    { id: 3, name: 'Physics Fundamentals', students: 38, instructor: 'Dr. Brown', progress: 80 },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Education CRM</h1>
            <p className="text-muted-foreground">Educational institutions and online learning</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">847</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-3xl font-bold">89%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Grade</p>
                <p className="text-3xl font-bold">B+</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="support">Tech Support</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.course}</p>
                        <p className="text-sm text-muted-foreground">Attendance: {student.attendance}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getGradeColor(student.grade)}>
                        {student.grade}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <BookOpen className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {course.students} students • Instructor: {course.instructor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="font-medium">{course.progress}%</p>
                        <p className="text-xs text-muted-foreground">Progress</p>
                      </div>
                      <Button size="sm">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Assessment management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Lead Generation
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">Track and manage prospective students</p>
                  <Button size="sm">View Leads</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Campaign Management</h4>
                  <p className="text-sm text-muted-foreground mb-3">Create marketing campaigns for enrollment</p>
                  <Button size="sm">Create Campaign</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tech Support Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Student Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">Help students with technical issues</p>
                  <Button size="sm">Open Support</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Faculty Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">Technical assistance for faculty</p>
                  <Button size="sm">Faculty Portal</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
