<template>
    <div class=" bg-sky-100	 px-5">
        <div class="row">
            <div class="card-body">
                <h2 class="title text-center text-2xl">Counselor Invitation Form</h2><br>

                <form method="POST" action="http://127.0.0.1:8000/api/became-an-agent" id="basic-form"
                    enctype="multipart/form-data">

                    <div class="row col-md-12 ml-1 mb-3">
                        <h4 class="text-xl">Basic Information</h4>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Counselor Name</label>
                                <input id="agent_name" required name="agent_name" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Counselor Phone</label>
                                <input id="agent_email" required name="agent_email" type="email" class="form-control">
                            </div>
                        </div>
                  
                    </div>
                    <div class="row col-md-12">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="pwd">Counselor Email</label>
                                    <input id="agent_email" required name="agent_email" type="email" class="form-control">
                                </div>
                            </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Alternative Contact</label>
                                <input id="agent_phone" name="agent_phone" type="text" class="form-control" required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">National Id Or Passport</label>
                                <input id="alternative_contact" name="alternative_contact" type="text"
                                    class="form-control" required>
                            </div>
                        </div>
                    
                    </div>
                    <div class="row col-md-12">
                        
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Country</label>
                                <select onchange="get_branch_by_country()" id="country" name="country"
                                    class="form-control" required>
                                    <option value="">--Select Country--</option>

                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">City</label>
                                <input id="alternative_contact" name="alternative_contact" type="text" class="form-control" required>
                            </div>
                        </div>
                   
                    </div>
                    <div class="row col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="pwd">Nationality</label>
                                    <input id="alternative_contact" name="alternative_contact" type="text" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="pwd">State</label>
                                    <input id="alternative_contact" name="alternative_contact" type="text" class="form-control" required>
                                </div>
                            </div>
                    </div>
                   
                    <div class="row col-md-12">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="pwd">Address in Details</label>
                                <textarea id="address" class="form-control" name="address" rows="3" required></textarea>
                            </div>
                        </div>
                            <div class="col-md-4 mt-5">
                                <div class="form-group">
                                    <label for="pwd">Upload Counselor Photo</label>
                                    <input name="logo" type="file" class="form-control ">
                                </div>
                            </div>
                    </div>
                     <h1 class="text-xl ml-2 mb-3">Counselor Login Information</h1>
                        <div class="row col-md-12">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="pwd">Person Name</label>
                                        <input id="alternative_contact" name="alternative_contact" type="text" class="form-control" required>
                                    </div>
                                </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="pwd">Email</label>
                                    <input id="alternative_contact" name="alternative_contact" type="email" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="pwd">Password</label>
                                    <input id="alternative_contact" name="alternative_contact" type="password" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="pwd">Confirm Password</label>
                                    <input id="alternative_contact" name="alternative_contact" type="password" class="form-control" required>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <input class="btn text-xl mr-5 bg-rose-500 submit-button" type="submit" value="Submit"/>
                        </div>
                </form>
            </div>
        </div>
    </div>

</template>
<script>
export default {

}
</script>


<style>
.submit-button {
            font-size: 1rem;
            color: white;
        }
</style>